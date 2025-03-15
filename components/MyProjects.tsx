'use client'
import projectsData from '@/data/projectsData'
import Card from '@/components/MyCard'
import { useState, useEffect } from 'react'
import { useLang } from '@/components/Lang/index'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/components/MyMotion'

export default function Projects() {
  const { t, lang, resolvedLang } = useLang()
  return (
    <>
      <motion.div className="" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex w-fit flex-col gap-1">
          <h1 className="font-medium tracking-tight text-gray-900 dark:text-gray-100">&nbsp;</h1>
          <h2>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{t('Projects')}</span>{' '}
          </h2>
        </motion.div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <motion.div
                className="md max-w-[300px] p-4 md:w-1/2"
                variants={itemVariants}
                key={d.title + Math.random()} // 分配一个随机数给key 防止重复
              >
                <Card title={d.title} description={d.description} imgSrc={d.imgSrc} href={d.href} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
