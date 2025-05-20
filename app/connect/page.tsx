import { genPageMetadata } from 'app/seo'
import Connect from '@/layouts/Connect'

export const metadata = genPageMetadata({ title: 'Connect' })
import headerNavLinks from '../../data/headerNavLinks'

export default function Projects() {
  const connectLink = headerNavLinks.find((link) => link.href === '/connect')
  const connectTitle = connectLink ? connectLink.title : ''
  return (
    <>
      <Connect title={connectTitle} />
    </>
  )
}
