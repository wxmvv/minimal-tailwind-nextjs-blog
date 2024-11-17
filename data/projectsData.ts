interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  // {
  //   title: 'A Search Engine',
  //   description: `What if you could look up any information in the world? Webpages, images, videos
  //   and more. Google has many features to help you find exactly what you're looking
  //   for.`,
  //   imgSrc: '/static/images/google.png',
  //   href: 'https://www.google.com',
  // },
  {
    title: 'Obsidian custom css',
    description: `我的obsidian定制css`,
    imgSrc: 'https://obsidian.md/images/obsidian-logo-gradient.svg',
    href: 'https://github.com/wxmvv/obsidian-custom-css', // href: '/blog/the-time-machine',
  },
]

export default projectsData
