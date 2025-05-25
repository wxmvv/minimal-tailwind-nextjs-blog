import { genPageMetadata } from 'app/seo'
import ProjectsVIew from '@/components/Projects'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <ProjectsVIew />
    </>
  )
}
