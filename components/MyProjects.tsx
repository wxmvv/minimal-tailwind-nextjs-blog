'use client'
import projectsData from '@/data/projectsData'
import Card from '@/components/MyCard'
import { useState, useEffect } from 'react'
import { useLang } from '@/components/Lang/index'

export default function Projects() {
  const { t, lang, resolvedLang } = useLang()
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])
  return (
    <>
      {/* <div className="divide-y divide-gray-200 dark:divide-gray-700"> */}
      <div
        className=""
        style={{
          opacity: loaded ? 1 : 0,
          filter: loaded ? 'blur(0)' : 'blur(8px)',
          transform: loaded ? 'none' : 'translateY(16px) translateZ(0)',
          transition: 'opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* <div className="space-y-2 pb-8 pt-6 md:space-y-5"> */}
        <div className="flex w-fit flex-col gap-1">
          {/* <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"> */}
          <h1 className="font-medium tracking-tight text-gray-900 dark:text-gray-100">&nbsp;</h1>
          <h2>
            <span className="font-semibold text-gray-900 dark:text-gray-100">{t('Projects')}</span>
          </h2>
        </div>
        {/* <div className="gap-12"> */}
        {/* <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"> */}
        {/* <h1 className="text-2xl font-extrabold leading-13 tracking-tight text-gray-900 dark:text-gray-100"> */}
        {/* </h1> */}
        {/* <p className="text-lg leading-7 text-gray-500 dark:text-gray-400"></p> */}
        {/* </div> */}
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {projectsData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
