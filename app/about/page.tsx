import { genPageMetadata } from 'app/seo'
import About from '@/layouts/About'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <About />
    </>
  )
}
