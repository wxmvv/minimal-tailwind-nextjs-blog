import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return <span className="mr-1 text-sm font-medium">{text.split(' ').join('-')}</span>
}

export default Tag
