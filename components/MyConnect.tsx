'use client'

import { useState, useEffect } from 'react'
import siteMetadata from '@/data/siteMetadata'
import MyConnectLink from './MyConnectLink'
import { useLang } from '@/components/Lang/index'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { containerVariants, itemVariants } from '@/components/MyMotion'

export default function Projects({ title }) {
  const { t, lang, resolvedLang } = useLang()

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div variants={itemVariants} className="flex w-fit flex-col gap-1 pb-12">
          <h1 className="font-medium tracking-tight text-gray-900 dark:text-gray-100">&nbsp;</h1>
          <h2>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{t(title)}</span>
          </h2>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <MyConnectLink kind="mail" href={`mailto:${siteMetadata.email}`} />
          <MyConnectLink kind="github" href={siteMetadata.github} />
          <MyConnectLink kind="facebook" href={siteMetadata.facebook} />
          <MyConnectLink kind="youtube" href={siteMetadata.youtube} />
          <MyConnectLink kind="linkedin" href={siteMetadata.linkedin} />
          <MyConnectLink kind="twitter" href={siteMetadata.twitter} />
          <MyConnectLink kind="x" href={siteMetadata.x} />
          <MyConnectLink kind="instagram" href={siteMetadata.instagram} />
          <MyConnectLink kind="threads" href={siteMetadata.threads} />
        </motion.div>
      </motion.div>
    </>
  )
}
