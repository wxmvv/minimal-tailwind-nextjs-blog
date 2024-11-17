'use client'

import * as React from 'react'
import { createContext, useContext, useState, useCallback } from 'react'
import type { LangProviderProps, UseLangProps } from './types'
import translations from './Lang.json'

const langSchemes = ['cn', 'en']
const defaultLangs = ['cn', 'en']
const isServer = typeof window === 'undefined'
const LangContext = React.createContext<UseLangProps | undefined>(undefined)
const defaultContext: UseLangProps = {
  setLang: () => {},
  langs: defaultLangs,
  lang: defaultLangs[0],
  t: (key) => translations[defaultLangs[0]][key] || key,
}
export const useLang = () => React.useContext(LangContext) ?? defaultContext

export const LangProvider = (props: LangProviderProps) => {
  const context = React.useContext(LangContext)
  if (context) return props.children
  const forcedLang = isServer ? props.forcedLang ?? 'cn' : undefined // 在 SSR 环境下通过 `forcedLang` 强制指定语言
  return <Lang {...props} forcedLang={forcedLang} />
}

const Lang = ({
  forcedLang,
  disableTransitionOnChange = false,
  enableLangScheme = true,
  storageKey = 'lang',
  langs = defaultLangs,
  defaultLang = 'cn',
  value,
  children,
  nonce,
}: LangProviderProps) => {
  const [lang, setLangState] = React.useState(() => getLang(storageKey, defaultLang))
  const [resolvedLang, setResolvedLang] = React.useState(() => getLang(storageKey))

  const applyLang = React.useCallback(
    (lang) => {
      let resolved = lang
      if (!resolved) return

      if (lang === 'system') resolved = getSystemLang()

      const name = value ? value[resolved] : resolved
      const enable = disableTransitionOnChange ? disableAnimation() : null
      const d = document.documentElement
      if (enableLangScheme) {
        const fallback = langSchemes.includes(defaultLang) ? defaultLang : null
        const langScheme = langSchemes.includes(resolved) ? resolved : fallback
        // @ts-ignore
        d.style.langScheme = langScheme
      }

      enable?.()
    },
    [defaultLang, disableTransitionOnChange, enableLangScheme, value]
  )

  const setLang = React.useCallback(
    (value) => {
      const newLang = typeof value === 'function' ? value(lang) : value
      setLangState(newLang)

      // Save to storage
      try {
        localStorage.setItem(storageKey, newLang)
      } catch (e) {
        // Unsupported
      }
    },
    [lang, storageKey]
  )

  const t = React.useCallback(
    (key: string) => {
      const currentLang = lang || 'cn'
      const translation = translations[currentLang]?.[key]
      if (!translation) {
        console.error(`Missing translation for key: ${key} in language: ${lang}`)
        return key // 返回 key 作为默认值
      }
      return translation
    },
    [lang]
  )

  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return
      }

      // If default lang set, use it if localstorage === null (happens on local storage manual deletion)
      const lang = e.newValue || defaultLang
      setLang(lang)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [defaultLang, setLang, storageKey])

  // Whenever lang or forcedLang changes, apply it
  React.useEffect(() => {
    applyLang(forcedLang ?? lang)
  }, [applyLang, forcedLang, lang])

  const providerValue = React.useMemo(
    () => ({
      lang,
      setLang,
      t,
      forcedLang,
      resolvedLang: lang === 'system' ? resolvedLang : lang,
      langs: langs,
    }),
    [lang, setLang, t, forcedLang, resolvedLang, langs]
  )

  return (
    <LangContext.Provider value={providerValue}>
      <LangScript
        {...{
          forcedLang,
          storageKey,
          // attribute,
          enableLangScheme,
          defaultLang,
          value,
          langs,
          t,
          nonce,
        }}
      />

      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react/display-name
const LangScript = React.memo(
  ({
    forcedLang,
    storageKey,
    // attribute,
    enableLangScheme,
    defaultLang,
    value,
    langs,
    nonce,
  }: Omit<LangProviderProps, 'children'> & { defaultLang: string }) => {
    const scriptArgs = JSON.stringify([
      // attribute,
      storageKey,
      defaultLang,
      forcedLang,
      langs,
      value,
      enableLangScheme,
    ]).slice(1, -1)

    return <script suppressHydrationWarning nonce={typeof window === 'undefined' ? nonce : ''} />
  }
)

// Helpers
const getLang = (key: string, fallback?: string) => {
  if (isServer) return undefined
  const lang = localStorage.getItem(key) || undefined
  return lang || fallback
}

const disableAnimation = () => {
  const css = document.createElement('style')
  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  )
  document.head.appendChild(css)

  return () => {
    // Force restyle
    ;(() => window.getComputedStyle(document.body))()

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css)
    }, 1)
  }
}

const getSystemLang = () => {
  const userLanguage = navigator.language || navigator.languages[0] || 'cn'
  return userLanguage
}
