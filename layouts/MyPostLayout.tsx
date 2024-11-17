import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/MyComments'
import Link from '@/components/Link'
import PageTitle from '@/components/MyPageTitle'
import SectionContainer from '@/components/MySectionContainer'
import Tag from '@/components/MyTagWithLinkLarge'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/MyScrollTopAndComment'
import { MotionDiv, MotionP, containerVariants, itemVariants } from '@/components/MyMotion'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`
// const postDateTemplate: Intl.DateTimeFormatOptions = { weekday: 'long',year: 'numeric', month: 'long', day: 'numeric'}
interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <>
      <ScrollTopAndComment />
      <MotionDiv variants={containerVariants} initial="hidden" animate="visible">
        <SectionContainer>
          <article>
            <div className="">
              <header className="">
                <MotionDiv variants={itemVariants} className="flex flex-col gap-1 text-start">
                  <div>
                    <PageTitle>{title}</PageTitle>
                  </div>
                  <dl>
                    <div>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-bold leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {/* {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)} */}
                          {new Date(date).toLocaleDateString()}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <dl>
                    <dt className="sr-only">Authors</dt>
                    <dd>
                      <ul className="flex flex-wrap justify-start gap-1 text-start">
                        {authorDetails.map((author) => (
                          <li className="flex items-center space-x-2" key={author.name}>
                            <dl className="whitespace-nowrap text-sm font-medium leading-5">
                              <dt className="sr-only">Name</dt>
                              <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                              <dt className="sr-only">Twitter</dt>
                              <dd>
                                {author.twitter && (
                                  <Link
                                    href={author.twitter}
                                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                  >
                                    {author.twitter
                                      .replace('https://twitter.com/', '@')
                                      .replace('https://x.com/', '@')}
                                  </Link>
                                )}
                              </dd>
                            </dl>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                </MotionDiv>
              </header>
              <MotionDiv variants={itemVariants} className="grid-rows-[auto_1fr] pb-8 ">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {/* <div className="prose max-w-none pb-8 pt-10 dark:prose-invert md:prose-lg"> */}
                  <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
                  <div className="pb-6 pt-6 text-sm text-gray-700 dark:text-gray-300">
                    <Link href={discussUrl(path)} rel="nofollow">
                      Discuss on Twitter
                    </Link>
                    {` • `}
                    <Link href={editUrl(filePath)}>View on GitHub</Link>
                  </div>
                  {siteMetadata.comments && (
                    <div
                      className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                      id="comment"
                    >
                      <Comments slug={slug} />
                    </div>
                  )}
                </div>
                <footer>
                  {/* md:-mx-28 */}
                  {/* <div className=" divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y"> */}
                  <div className=" col-start-1 row-start-2 text-sm font-medium leading-5">
                    {tags && (
                      <div className="py-4">
                        <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                          Tags
                        </h2>
                        <div className="flex flex-wrap text-lg ">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    )}
                    {(next || prev) && (
                      <div className="flex justify-between py-4">
                        {prev && prev.path && (
                          <div>
                            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              Previous Article
                            </h2>
                            <div className="text-gray-800 underline hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                              <Link href={`/${prev.path}`}>{prev.title}</Link>
                            </div>
                          </div>
                        )}
                        {next && next.path && (
                          <div>
                            <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                              Next Article
                            </h2>
                            <div className="text-gray-800 underline hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                              <Link href={`/${next.path}`}>{next.title}</Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="pt-8">
                    <Link
                      href={`/${basePath}`}
                      className="text-gray-800 underline hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
                      aria-label="Back to the blog"
                    >
                      &larr; Return blog
                    </Link>
                  </div>
                </footer>
              </MotionDiv>
            </div>
          </article>
        </SectionContainer>
      </MotionDiv>
    </>
  )
}
