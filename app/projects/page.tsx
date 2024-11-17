// import projectsData from '@/data/projectsData'
// import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'
import MyProjects from '@/components/MyProjects'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <MyProjects />
    </>
  )
}
