import { genPageMetadata } from 'app/seo'
import MyAbout from '@/components/MyAbout'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <MyAbout />
    </>
  )
}
