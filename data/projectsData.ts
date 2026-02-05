interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  tag?: string
}

const projectsData: Project[] = [
  {
    title: 'A Search Engine',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/google.png',
    href: 'https://www.google.com',
  },
  {
    title: 'The Time Machine',
    description: `Imagine being able to travel back in time or to the future. Simple turn the knob
    to the desired date and press "Go". No more worrying about lost keys or
    forgotten headphones with this simple yet affordable solution.`,
    imgSrc: '/static/images/time-machine.jpg',
    href: '/blog/the-time-machine',
  },
  {
    title: 'A Search Engine withno href',
    description: `What if you could look up any information in the world? Webpages, images, videos
    and more. Google has many features to help you find exactly what you're looking
    for.`,
    imgSrc: '/static/images/google.png',
  },
  {
    title: 'Gin Vue Admin',
    description: `Vite+Vue3+Gin拥有AI辅助的基础开发平台，支持TS和JS混用。它集成了JWT鉴权、权限管理、动态路由、显隐可控组件、分页封装、多点登录拦截、资源权限、上传下载、代码生成器、表单生成器和可配置的导入导出等开发必备功能。`,
    imgSrc:
      'https://camo.githubusercontent.com/6ff207002f7a10392ed976dcc540070f56f67d7c606a24aff30b76733d0eed71/687474703a2f2f716d706c7573696d672e68656e726f6e6779692e746f702f6776616c6f676f2e6a7067',
    tag: 'recommend',
  },
]

export default projectsData
