import { Parent, Node } from 'unist'
import { visit } from 'unist-util-visit'
import { sync as probeImageSize } from 'probe-image-size'
import fs from 'fs'
import path from 'path'

type ImageNode = Parent & {
  url: string
  alt: string
  name: string
  attributes: any[]
}

const imageExtensions = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'avif',
  'svg',
  'bmp',
  'tiff',
  'tif',
])

const blockMediaExtensions = new Set([
  'pdf',
  'mp3',
  'wav',
  'm4a',
  'flac',
  'aac',
  'wma',
  'opus',
  'mp4',
  'webm',
  'ogg',
  'mov',
  'avi',
  'mkv',
  'flv',
  'wmv',
])

const getExtension = (url: string) => {
  const normalizedUrl = url.split(/[?#]/)[0] || ''
  return normalizedUrl.split('.').pop()?.toLowerCase() || ''
}

/**
 * 修复版的 remarkImgToJsx 插件
 * 处理本地图片文件，转换为 Next.js Image 组件
 * 添加了错误处理和 null 检查
 */
export default function remarkImgToJsxFixed() {
  return (tree: Node) => {
    visit(
      tree,
      // 只访问包含 img 元素的 p 标签
      (node: Parent): node is Parent =>
        node.type === 'paragraph' && node.children.some((n) => n.type === 'image'),
      (node: Parent) => {
        const imageNodeIndex = node.children.findIndex((n) => n.type === 'image')
        const imageNode = node.children[imageNodeIndex] as ImageNode

        try {
          if (!imageNode.url) {
            return
          }

          const extension = getExtension(imageNode.url)
          if (blockMediaExtensions.has(extension)) {
            node.type = 'div'
            return
          }

          if (!imageNode.url.startsWith('/') || imageNode.url.includes('://')) {
            return
          }

          if (!imageExtensions.has(extension)) {
            return
          }

          const filePath = path.join(process.cwd(), 'public', imageNode.url)
          if (!fs.existsSync(filePath)) {
            return
          }

          const fileBuffer = fs.readFileSync(filePath)
          const dimensions = probeImageSize(fileBuffer)
          if (!dimensions?.width || !dimensions?.height) {
            console.warn(`无法获取图片尺寸: ${imageNode.url}`)
            return
          }

          imageNode.type = 'mdxJsxFlowElement'
          imageNode.name = 'Image'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt || '' },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            { type: 'mdxJsxAttribute', name: 'height', value: dimensions.height },
          ]

          node.type = 'div'
          node.children[imageNodeIndex] = imageNode
        } catch (error) {
          console.error(`处理图片时出错 ${imageNode.url}:`, error)
          // 出错时保持原样，不转换
        }
      }
    )
  }
}
