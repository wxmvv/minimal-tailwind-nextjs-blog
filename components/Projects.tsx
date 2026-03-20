'use client'
import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { useLang } from '@/components/Lang/index'
import { motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/components/Motion'

export default function Projects() {
  const { t } = useLang()
  return (
    <>
      <motion.div className="" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants} className="flex w-fit flex-col gap-1">
          <h1 className="font-medium tracking-tight text-gray-900 dark:text-gray-100">&nbsp;</h1>
          <h2>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{t('Projects')}</span>
          </h2>
        </motion.div>
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {projectsData.map((d) => (
              <motion.div className="h-full" variants={itemVariants} key={d.title}>
                <Card
                  title={d.title}
                  description={d.description}
                  imgSrc={d.imgSrc}
                  href={d.href}
                  tag={d.tag}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}
