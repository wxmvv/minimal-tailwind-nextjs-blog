import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import { Children, isValidElement } from 'react'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import PDFViewer from './PDFViewer'
import MediaPlayer from './mediaPlayer'
import SimpleAudioPlayer from './SimpleAudioPlayer'

const getFileExtension = (src?: string) => {
  if (!src) return ''

  const normalizedSrc = src.split(/[?#]/)[0] || ''
  return normalizedSrc.split('.').pop()?.toLowerCase() || ''
}

const parseDimension = (value: string | number | undefined): number => {
  if (value === undefined || value === null) return 0
  const num = typeof value === 'string' ? parseInt(value, 10) : value
  return isNaN(num) ? 0 : num
}

const isMediaChild = (child: unknown) =>
  isValidElement(child) &&
  (child.type === PDFViewer || child.type === MediaPlayer || child.type === SimpleAudioPlayer)

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  p: ({ children }) => {
    const meaningfulChildren = Children.toArray(children).filter(
      (child) => !(typeof child === 'string' && child.trim() === '')
    )

    if (meaningfulChildren.length === 1 && isMediaChild(meaningfulChildren[0])) {
      return <div>{meaningfulChildren[0]}</div>
    }

    return <p>{children}</p>
  },
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  // 添加 PDF、视频和音频组件映射
  PDFViewer,
  MediaPlayer,
  SimpleAudioPlayer,
  img: ({ src, alt, width, height, ...props }) => {
    const extension = getFileExtension(src)
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'flv', 'wmv']
    const pdfExtensions = ['pdf']
    const audioExtensions = ['mp3', 'wav', 'ogg', 'm4a', 'flac', 'aac', 'wma', 'opus']
    const safeSrc = src || ''
    const safeAlt = alt || ''

    if (pdfExtensions.includes(extension)) {
      return <PDFViewer src={safeSrc} title={safeAlt} />
    }

    if (videoExtensions.includes(extension)) {
      return <MediaPlayer src={safeSrc} alt={safeAlt} />
    }

    if (audioExtensions.includes(extension)) {
      return <SimpleAudioPlayer src={safeSrc} title={safeAlt} />
    }

    let finalWidth = parseDimension(width)
    let finalHeight = parseDimension(height)

    if (finalWidth <= 0 || finalHeight <= 0) {
      const sizeMatch = safeSrc.match(/\/(\d+)\/(\d+)(?:$|\/|\?)/)
      if (sizeMatch) {
        finalWidth = parseInt(sizeMatch[1], 10)
        finalHeight = parseInt(sizeMatch[2], 10)
      }
    }

    if (finalWidth <= 0 || finalHeight <= 0) {
      finalWidth = 800
      finalHeight = 600
      console.warn(`Image ${safeSrc} is missing valid width or height, using defaults: 800x600`)
    }

    return <Image src={safeSrc} alt={safeAlt} width={finalWidth} height={finalHeight} {...props} />
  },
}
