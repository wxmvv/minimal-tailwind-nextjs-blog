import * as React from 'react'

interface ValueObject {
  [langName: string]: string
}

export interface UseLangProps {
  /** List of all available lang names */
  langs: string[]
  /** Forced lang name for the current page */
  forcedLang?: string | undefined
  /** Update the lang */
  setLang: React.Dispatch<React.SetStateAction<string>>
  /** Active lang name */
  lang?: string | undefined
  /** If `enableSystem` is true and the active lang is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `lang` */
  resolvedLang?: string | undefined
  /** If enableSystem is true, returns the System lang preference ("dark" or "light"), regardless what the active lang is */
  // systemLang?: 'cn' | 'en' | undefined
  /**
   *
   * @param key
   * @returns
   */
  t: (key: string) => string
}

// export type Attribute = `data-${string}` | 'class'

export interface LangProviderProps extends React.PropsWithChildren {
  /** List of all available lang names */
  langs?: string[] | undefined
  /** Forced lang name for the current page */
  forcedLang?: string | undefined
  /** Whether to switch between dark and light langs based on prefers-color-scheme */
  // enableSystem?: boolean | undefined
  /** Disable all CSS transitions when switching langs */
  disableTransitionOnChange?: boolean | undefined
  /** Whether to indicate to browsers which color scheme is used (dark or light) for built-in UI like inputs and buttons */
  enableLangScheme?: boolean | undefined
  /** Key used to store lang setting in localStorage */
  storageKey?: string | undefined
  /** Default lang name (for v0.0.12 and lower the default was light). If `enableSystem` is false, the default lang is light */
  defaultLang?: string | undefined
  /** HTML attribute modified based on the active lang. Accepts `class`, `data-*` (meaning any data attribute, `data-mode`, `data-color`, etc.), or an array which could include both */
  // attribute?: Attribute | Attribute[] | undefined
  /** Mapping of lang name to HTML attribute value. Object where key is the lang name and value is the attribute value */
  value?: ValueObject | undefined
  /** Nonce string to pass to the inline script for CSP headers */
  nonce?: string | undefined
}
