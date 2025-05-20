'use client'

import siteMetadata from '@/data/siteMetadata'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export default function Comments({ slug }: { slug: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  if (!siteMetadata.comments?.provider) {
    return null
  }

  return (
    <Giscus
      id="comments"
      repo="wxmvv/wxmvv.github.io"
      repoId="R_kgDOI7nK0A"
      category="Announcements"
      categoryId="DIC_kwDOI7nK0M4Cgqgb"
      mapping="pathname"
      term="Welcome!"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="zh-CN"
      loading="lazy"
    />
  )
}
