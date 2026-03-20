/* eslint-disable jsx-a11y/media-has-caption */
'use client'
import { useState, useRef } from 'react'
import Image from 'next/image'

interface MediaPlayerProps {
  src: string
  alt?: string
  title?: string
  autoPlay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
}

const getMediaType = (src: string): 'image' | 'video' | 'unknown' => {
  const extension = src.split(/[?#]/)[0]?.split('.').pop()?.toLowerCase() || ''
  const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'flv', 'wmv']
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'tiff', 'avif']

  if (videoExtensions.includes(extension)) {
    return 'video'
  }

  if (imageExtensions.includes(extension)) {
    return 'image'
  }

  return 'unknown'
}

const MediaPlayer = ({
  src,
  alt = '',
  title,
  autoPlay = true,
  controls = true,
  loop = true,
  muted = true,
}: MediaPlayerProps) => {
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const mediaType = getMediaType(src)

  const handleCanPlay = () => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error('视频自动播放失败:', error)
        // 自动播放失败时显示控件
        if (videoRef.current) {
          videoRef.current.controls = true
        }
      })
    }
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error('视频加载错误:', e)
    setError('视频加载失败，请检查文件路径或格式')
  }

  if (!src) {
    return <div className="media-empty">无媒体内容</div>
  }

  if (mediaType === 'unknown') {
    return (
      <div className="media-player my-6">
        <div className="unknown-media rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <p className="text-yellow-700 dark:text-yellow-400">不支持的媒体格式</p>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            直接访问文件
          </a>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="media-error my-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">文件路径: {src}</p>
        {mediaType === 'video' && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
          >
            直接下载视频文件
          </a>
        )}
      </div>
    )
  }

  return (
    <div className="media-player my-6">
      {title && (
        <div className="media-title mb-2 text-sm text-gray-600 dark:text-gray-400">{title}</div>
      )}

      {mediaType === 'video' ? (
        <div className="video-container overflow-hidden rounded-lg">
          <video
            key={src}
            ref={videoRef}
            src={src}
            autoPlay={autoPlay}
            playsInline
            muted={muted}
            loop={loop}
            controls={controls}
            preload="auto"
            className="h-auto w-full max-w-full rounded-lg"
            onCanPlay={handleCanPlay}
            onError={handleError}
            aria-label={alt || '视频内容'}
            title={title}
          />
          {alt && (
            <div className="video-caption mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {alt}
            </div>
          )}
        </div>
      ) : mediaType === 'image' ? (
        <div className="image-container">
          <Image
            src={src}
            blurDataURL="/static/place.webp"
            alt={alt}
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            decoding="async"
            className="h-auto max-h-[600px] w-auto max-w-full rounded-lg object-contain"
            style={{ color: 'transparent' }}
            title={title}
          />
          {alt && (
            <div className="image-caption mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              {alt}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default MediaPlayer
