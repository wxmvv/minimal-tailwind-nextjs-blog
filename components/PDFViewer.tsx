interface PDFViewerProps {
  src: string
  title?: string
  height?: number
}

export default function PDFViewer({ src, title = 'PDF 文档', height = 720 }: PDFViewerProps) {
  return (
    <div className="pdf-viewer my-6 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="pdf-header border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</h3>
      </div>

      <div className="pdf-content p-3 sm:p-4">
        <iframe
          src={src}
          title={title}
          className="h-[70vh] min-h-[480px] w-full rounded-md border border-gray-200 dark:border-gray-700"
          style={{ height }}
        />
      </div>

      <div className="pdf-footer flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-2 text-xs dark:border-gray-700 dark:bg-gray-800">
        <span className="text-gray-500 dark:text-gray-400">
          如果浏览器不支持内嵌 PDF，请使用新窗口打开。
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          在新窗口中查看或下载
        </a>
      </div>
    </div>
  )
}
