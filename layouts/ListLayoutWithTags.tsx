/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/TagWithLink'
// import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import { useState, useEffect } from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import SearchButton from '@/components/SearchButton'
import RssButton from '@/components/RssButton'
// import Image from 'next/image'
// import Feed from '../public/feed.svg'
import { useLang } from '@/components/Lang/index'
// import { Fragment } from 'react'

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    // <div className="space-y-2 pb-8 pt-6 md:space-y-5">
    // <div className="mb-16 space-y-2 pt-6 md:space-y-5">
    <div className="space-y-2 pt-6 md:space-y-5">
      {/* <nav className="flex justify-between "> */}
      <nav className="flex justify-start gap-8 ">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const { t, lang, resolvedLang } = useLang()

  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div
        className="flex origin-left flex-col gap-12"
        style={{
          opacity: loaded ? 1 : 0,
          filter: loaded ? 'blur(0)' : 'blur(8px)',
          transform: loaded ? 'none' : 'translateY(16px) translateZ(0)',
          transition: 'opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease',
        }}
      >
        <div className="flex w-fit flex-col gap-1">
          {/* <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"> */}
          <h1 className="font-medium tracking-tight text-gray-900 dark:text-gray-100">&nbsp;</h1>
          <h2>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {title === 'All Post' ? t(title) : title}
            </span>
          </h2>
        </div>
        <Menu>
          <div className="flex flex-row gap-4">
            {/* <Link
              className="cursor-pointer font-medium text-zinc-400 hover:underline dark:text-zinc-400 dark:hover:underline"
              href={`/tags`}
            >
              #TagCloud
            </Link> */}
            <MenuButton className="cursor-pointer font-medium text-zinc-400 hover:underline dark:text-zinc-400">
              <div>{t('#TagList')}</div>
            </MenuButton>

            {pathname.startsWith('/blog') ? null : (
              <Link
                className="cursor-pointer font-medium text-zinc-400 hover:underline dark:text-zinc-400"
                href={`/blog`}
              >
                {t('#AllPosts')}
              </Link>
            )}
            <SearchButton />
            <RssButton />
          </div>
          <MenuItems
            transition
            anchor="bottom end"
            className="h-64 max-h-[280px] w-52 max-w-[280px] origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            // className="absolute top-32 h-96 min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 "
          >
            <MenuItem>
              {/* <div className='ab'></div> */}
              <div className=" bg-gray-200 px-6 py-4  dark:bg-black">
                {pathname.startsWith('/blog') ? (
                  <h3 className="font-bold uppercase text-primary-500">{t('#TagList')}</h3>
                ) : (
                  <Link
                    href={`/blog`}
                    className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                  >
                    {t('#AllPosts')}
                  </Link>
                )}
                <ul>
                  {sortedTags.map((t) => {
                    return (
                      <li key={t} className="my-3">
                        {pathname.split('/tags/')[1] === slug(t) ? (
                          <h3 className="inline px-3 py-2 text-sm font-bold uppercase text-primary-500">
                            {`${t} (${tagCounts[t]})`}
                          </h3>
                        ) : (
                          <Link
                            href={`/tags/${slug(t)}`}
                            className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                            aria-label={`View posts tagged ${t}`}
                          >
                            {`${t} (${tagCounts[t]})`}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>

        <div className="block">
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  // <li key={path} className="py-6">
                  <li key={path} className="mb-6">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        {/* <dd className="text-sm font-medium leading-4 text-gray-500 dark:text-gray-400"> */}
                        <dd className="text-xs text-gray-500 dark:text-gray-400">
                          {/* <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time> */}
                          <time dateTime={date}>{formatDate(date, 'en-US')}</time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          {/* <h2 className="font-medium leading-8 tracking-tight"> */}
                          <h2 className="relative inline-block font-medium transition-colors duration-300">
                            <Link
                              href={`/${path}`}
                              className="text-gray-900 underline decoration-gray-300  underline-offset-4 hover:decoration-gray-800 dark:text-gray-100 dark:decoration-gray-500  dark:hover:decoration-gray-200"
                              style={{
                                transition: 'all 0.3 ease ',
                              }}
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap ">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className="prose prose-sm max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
