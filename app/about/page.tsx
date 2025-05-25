import { genPageMetadata } from 'app/seo'
import About from '@/components/About'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <About />
    </>
  )
}
