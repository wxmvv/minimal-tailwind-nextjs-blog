import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      // className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      // className="mr-1 text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400"
      className="mr-2 font-normal text-gray-800 underline hover:text-primary-600 dark:text-gray-200 dark:hover:text-primary-400"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
