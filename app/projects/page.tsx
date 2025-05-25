import { genPageMetadata } from 'app/seo'
import ProjectsView from '@/components/Projects'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <ProjectsView />
    </>
  )
}
