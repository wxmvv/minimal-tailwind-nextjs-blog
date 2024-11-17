import { ReactNode } from 'react'
import Image from '@/components/Image'
import Bleed from 'pliny/ui/Bleed'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Comments from '@/components/MyComments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import Tag from '@/components/MyTagWithLinkLarge'
import SectionContainer from '@/components/MySectionContainer'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/MyScrollTopAndComment'
import { MotionDiv, MotionP } from '@/components/MyMotion'

interface LayoutProps {
  content: CoreContent<Blog>
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags, images } = content
  const basePath = path.split('/')[0]
  const displayImage =
    images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

  return (
    <>
      <ScrollTopAndComment />
      <MotionDiv
        initial={{ opacity: 0, filter: 'blur(8px)', transform: 'translateY(16px) translateZ(0)' }}
        animate={{ opacity: 1, filter: 'blur(0)', transform: 'none' }}
        transition={{
          type: 'tween', //默认值
          duration: 0.6,
          ease: [0.25, 0.7, 0.9, 1.0],
        }}
      >
        <SectionContainer>
          <article>
            <div>
              <div className="space-y-1 pb-10 text-center dark:border-gray-700">
                <div className="w-full">
                  {/* TODO banner样式 */}
                  {/* <Bleed className="2xl:-mx-96"> */}
                  <div className="-mx-[30vw]">
                    <div className="relative aspect-[2/1] max-h-96 w-full">
                      <Image src={displayImage} alt={title} fill className="object-cover" />
                    </div>
                  </div>
                  {/* </Bleed> */}
                </div>
                <div className="relative pt-10">
                  <PageTitle>{title}</PageTitle>
                </div>
              </div>
              <div className="prose max-w-none py-4 dark:prose-invert">{children}</div>
              {siteMetadata.comments && (
                <div
                  className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
                  id="comment"
                >
                  <Comments slug={slug} />
                </div>
              )}
              <footer>
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
                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                  {prev && prev.path && (
                    <div className="text-gray-800 underline hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                      <Link href={`/${prev.path}`} aria-label={`Previous post: ${prev.title}`}>
                        &larr; {prev.title}
                      </Link>
                    </div>
                  )}
                  {next && next.path && (
                    <div className="text-gray-800 underline hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400">
                      <Link href={`/${next.path}`} aria-label={`Next post: ${next.title}`}>
                        {next.title} &rarr;
                      </Link>
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
            </div>
          </article>
        </SectionContainer>
      </MotionDiv>
    </>
  )
}
