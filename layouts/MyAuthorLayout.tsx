'use client'
import { ReactNode } from 'react'
import { useState, useEffect, useRef } from 'react'
import type { Authors } from 'contentlayer/generated'
import Link from '@/components/Link'
import { useLang } from '@/components/Lang/index'
import { MotionDiv, containerVariants, itemVariants } from '@/components/MyMotion'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
  title: string
}

export default function AuthorLayout({ children, content, title }: Props) {
  const { t, lang, resolvedLang } = useLang()
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <MotionDiv initial="hidden" animate="visible" variants={containerVariants}>
        <div className="flex flex-col gap-8 divide-y divide-gray-200 pb-12 dark:divide-gray-700">
          <MotionDiv variants={itemVariants} className="flex w-fit flex-col gap-1">
            <h1 className="font-medium tracking-tight text-gray-900 dark:text-gray-100">&nbsp;</h1>
            <h2>
              <span className="font-semibold text-gray-900  dark:text-gray-100">{title}</span>
            </h2>
          </MotionDiv>
          <MotionDiv
            variants={itemVariants}
            className="author prose max-w-none pb-8 pt-12 dark:prose-invert xl:col-span-2"
          >
            {children}
          </MotionDiv>
        </div>
        <Link href={'/connect'} className="underline">
          {t('Connect')}
        </Link>
      </MotionDiv>
    </>
  )
}
