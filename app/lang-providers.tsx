'use client'

import { LangProvider, useLang } from '@/components/Lang/index'
import siteMetadata from '@/data/siteMetadata'

export function LangProviders({ children }: { children: React.ReactNode }) {
  const { t, lang, resolvedLang } = useLang()

  return (
    <LangProvider defaultLang={siteMetadata.lang} data-lang={resolvedLang}>
      {children}
    </LangProvider>
  )
}
