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
      className="mr-1 text-sm font-medium text-gray-400 hover:text-gray-900 hover:underline dark:hover:text-gray-100"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
