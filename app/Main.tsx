'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { navBtn, headerTitleBtn } from '@/data/headerNavLinks'
import SearchButton from '@/components/MySearchButton'
import { useState, useEffect, useRef, use } from 'react'
// import Image from 'next/image'
import Media from '@/components/MyMedia'
import Link from '@/components/Link'
import Tag from '@/components/MyTag'
import siteMetadata from '@/data/siteMetadata'
import ThemeSwitch from '@/components/MyThemeSwitch'
import LangSwitch from '@/components/Lang/LangSwitch'
// import { formatDate } from 'pliny/utils/formatDate'
// import NewsletterForm from 'pliny/ui/NewsletterForm'
import { useLang } from '@/components/Lang/index'
import { AnimatePresence, motion } from 'framer-motion'
import { containerVariants, itemVariants } from '@/components/MyMotion'
import TypingAnimation from '@/components/TypingAnimation'

const MAX_DISPLAY = 8

export default function Home({ posts }) {
  useEffect(() => {
    const originalConsoleError = console.error
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('Undeliverable message')) {
        return
      }
      originalConsoleError(...args)
    }
    return () => {
      console.error = originalConsoleError // 清理，恢复原始方法
    }
  }, [])
  const { t, lang, resolvedLang } = useLang()
  const [btnHoveredIndex, setBtnHoveredIndex] = useState(null)
  const [lastHoveredIndex, setLastHoveredIndex] = useState(null)
  const [activePreview, setActivePreview] = useState(null)
  const [previewSrc, setPreviewSrc] = useState('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const handleMouseEnter = (index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setLastHoveredIndex(index)
    timeoutRef.current = setTimeout(() => {
      setActivePreview(index)
      setPreviewSrc(posts[index]?.media)
      setBtnHoveredIndex(index)
    }, 100)
  }
  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setActivePreview(null)
      setBtnHoveredIndex(null)
      setPreviewSrc('')
    }, 1500)
  }
  const liRefs = useRef(new Array(MAX_DISPLAY).fill(null))
  useEffect(() => {
    liRefs.current = liRefs.current.slice(0, posts.length)
  }, [posts])

  return (
    <>
      <div>
        {/* MARK 这里是右侧预览与动画 */}
        <div className="fixed left-1/2 top-0 h-screen w-full">
          <div className="relative left-8 top-1/2 h-fit max-w-[484px] -translate-y-1/2 transform-gpu">
            <AnimatePresence mode="wait">
              {activePreview !== null && (
                <motion.div
                  className="h-fit w-full"
                  key={activePreview}
                  initial={{
                    opacity: 0,
                    filter: 'blur(8px)',
                    transform: 'translateY(16px) translateZ(0)',
                    // transitionDuration: '0.2s',
                  }}
                  animate={{
                    opacity: 1,
                    filter: 'blur(0px)',
                    transform: 'none',
                  }}
                  exit={{
                    opacity: 0,
                    filter: 'blur(8px)',
                    transform: 'none',
                    // transitionDuration: '0.6s',
                  }}
                  transition={{
                    type: 'tween',
                    duration: 0.2,
                  }}
                >
                  <Media src={previewSrc} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* MARK 这里是content */}
        <motion.div
          className="flex origin-left flex-col gap-12"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* MARK 这里是 author 和 desc 标题栏*/}
          <motion.div variants={itemVariants} className="z-20 flex w-full flex-col gap-1">
            <div className="relative inline-flex w-fit gap-2">
              <h1 className="inline-block font-extrabold text-gray-900 dark:text-gray-100">
                {siteMetadata.author}
              </h1>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {siteMetadata.description ? `<${siteMetadata.description} />` : ''}
              </span>
              {headerTitleBtn.ThemeSwitch && <ThemeSwitch isDown={true} />}
            </div>
            <h2 className="inline-flex h-6 gap-4 ">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                <TypingAnimation text1="Welcome!" text2="(⁎⁍̴̛ᴗ⁍̴̛⁎)" speed={100}></TypingAnimation>
              </span>
            </h2>
          </motion.div>

          {/* MARK 这里是导航栏nav */}
          <motion.div variants={itemVariants} className="z-10 flex flex-row gap-4">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="block font-medium text-zinc-400 hover:underline dark:text-zinc-400 dark:hover:underline"
                >
                  {t(link.title)}
                </Link>
              ))}
            {navBtn.SearchButton && <SearchButton />}
            {navBtn.LangSwitch && <LangSwitch />}
            {navBtn.ThemeSwitch && <ThemeSwitch isDown={true} />}
          </motion.div>

          {/* MARK 这里是文章列表 */}
          <ul className="z-10 flex w-fit shrink-0 flex-col gap-2">
            <div
              className="absolute -ml-[16px] h-full w-full bg-zinc-100 dark:bg-zinc-800"
              style={{
                transition:
                  btnHoveredIndex !== null
                    ? 'opacity 0.5s ease, top 0.4s ease, left 0.5s ease, width 0.4s ease'
                    : 'opacity 0.8s ease',
                top:
                  lastHoveredIndex !== null ? liRefs.current[lastHoveredIndex]?.offsetTop : 'none',
                left: lastHoveredIndex !== null ? liRefs.current[0]?.offsetLeft : 'none',
                width:
                  lastHoveredIndex !== null
                    ? liRefs.current[lastHoveredIndex || 0]?.offsetWidth + 32
                    : 0,
                height:
                  lastHoveredIndex !== null ? liRefs.current[lastHoveredIndex]?.offsetHeight : 0,
                opacity: btnHoveredIndex !== null ? 1 : 0,
                borderRadius: '10px',
              }}
            ></div>
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((post, index) => {
              const { slug, date, title, summary, tags, media } = post
              return (
                <motion.li
                  variants={itemVariants}
                  key={slug}
                  className="inline w-fit"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  ref={(el) => {
                    liRefs.current[index] = el
                  }}
                >
                  <article>
                    <Link href={`/blog/${slug}`}>
                      <div className="relative inline-flex flex-col gap-1 py-2 text-gray-900 no-underline dark:text-gray-100">
                        <span className="font-medium text-gray-900 hover:underline  dark:text-gray-100">
                          {title}
                        </span>
                        <span className="flex flex-row gap-2 text-sm font-normal text-zinc-400">
                          <time dateTime={date}>{new Date(date).getFullYear()} </time>
                          <div className="flex flex-row flex-nowrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </span>
                      </div>
                    </Link>
                  </article>
                </motion.li>
              )
            })}
          </ul>
        </motion.div>
      </div>
    </>
  )
}

{
  /* <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time> */
}
