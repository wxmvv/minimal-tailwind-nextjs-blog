'use client'

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { Authors, allAuthors } from 'contentlayer/generated'
import { coreContent } from 'pliny/utils/contentlayer'
import { useLang } from '@/components/Lang/index'

export default function About() {
  const { t, lang, resolvedLang } = useLang()
  const findfile =
    resolvedLang === 'cn' ? 'default-cn' : resolvedLang === 'en' ? 'default-en' : 'default'
  let author = allAuthors.find((p) => p.slug === findfile) as Authors
  if (typeof author?.body === 'undefined')
    author = allAuthors.find((p) => p.slug === 'default') as Authors // 如果没有找到对应的文件，则使用默认的文件
  const mainContent = coreContent(author)
  const title = 'About'
  return (
    <AuthorLayout content={mainContent} title={t(title)}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}
