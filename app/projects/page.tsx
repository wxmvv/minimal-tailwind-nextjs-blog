import { genPageMetadata } from 'app/seo'
import Project from '@/layouts/Project'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <Project />
    </>
  )
}
