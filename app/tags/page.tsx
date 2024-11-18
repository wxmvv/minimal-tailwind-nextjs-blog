import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { MotionDiv, containerVariants, itemVariants } from '@/components/MyMotion'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <MotionDiv
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0"
    >
      <MotionDiv variants={itemVariants} className="space-x-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 ">
          Tags
        </h1>
      </MotionDiv>
      <div className="flex max-w-lg flex-wrap">
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map((t) => {
          return (
            <MotionDiv variants={itemVariants} key={t} className="mb-2 mr-5">
              <Tag text={t} />
              <Link
                href={`/tags/${slug(t)}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                aria-label={`View posts tagged ${t}`}
              >
                {` (${tagCounts[t]})`}
              </Link>
            </MotionDiv>
          )
        })}
      </div>
    </MotionDiv>
  )
}
