'use client'

// import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import ConnectLink from '../ConnectLink'
import { useLang } from '@/components/Lang/index'
import { MotionDiv, containerVariants, itemVariants } from '@/components/Motion'
import Feed from '../public/feed.svg'

export default function Projects({ title }) {
  const { t } = useLang()

  return (
    <MotionDiv initial="hidden" animate="visible" variants={containerVariants}>
      <MotionDiv variants={itemVariants} className="flex w-fit flex-col gap-1 pb-12">
        <h1 className="font-medium tracking-tight text-gray-900 dark:text-gray-100">&nbsp;</h1>
        <h2>
          <span className="font-semibold text-gray-900 dark:text-gray-100">{t(title)}</span>
        </h2>
      </MotionDiv>

      <MotionDiv variants={itemVariants} className="flex flex-col gap-4">
        <ConnectLink iconSize={4} kind="mail" href={`mailto:${siteMetadata.email}`} />
        <ConnectLink iconSize={4} kind="github" href={siteMetadata.github} />
        <ConnectLink iconSize={4} icon kind="facebook" href={siteMetadata.facebook} />
        <ConnectLink iconSize={4} icon kind="youtube" href={siteMetadata.youtube} />
        <ConnectLink iconSize={4} icon kind="linkedin" href={siteMetadata.linkedin} />
        <ConnectLink iconSize={4} icon kind="twitter" href={siteMetadata.twitter} />
        <ConnectLink iconSize={4} icon kind="x" href={siteMetadata.x} />
        <ConnectLink iconSize={4} icon kind="instagram" href={siteMetadata.instagram} />
        <ConnectLink iconSize={4} icon kind="threads" href={siteMetadata.threads} />
        <a
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-start gap-2"
        >
          <div className="text-gray-900 underline decoration-gray-100 underline-offset-2 transition hover:decoration-gray-400 dark:text-gray-100  dark:decoration-gray-500 dark:hover:decoration-gray-200">
            <span className="capitalize">Feed</span>
          </div>
          <Feed
            className={`h-4 w-4 fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400`}
          />
        </a>
      </MotionDiv>
    </MotionDiv>
  )
}
