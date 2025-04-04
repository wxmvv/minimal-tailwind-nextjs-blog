/* eslint-disable jsx-a11y/media-has-caption */
'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const MediaPlayer = ({ src }) => {
  const [isVideo, setIsVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const videoExtensions = ['mp4', 'webm', 'ogg']
    const extension = src?.split('.').pop()?.toLowerCase() || ''
    setIsVideo(videoExtensions.includes(extension))
  }, [src])

  const handleCanPlay = () => {
    const videoElement = videoRef.current
    if (videoElement)
      videoElement.play().catch((error) => console.error('Error playing video:', error))
  }

  if (!src) {
    return <div></div>
  }

  return (
    <>
      {isVideo ? (
        <video
          key={src}
          ref={videoRef}
          src={src}
          // autoPlay // 自动播放
          playsInline // 在 iPhone Safari 上播放内联视频
          muted
          loop
          preload={'auto'}
          className={'h-auto max-h-[484px] w-auto max-w-[484px] rounded-[10px]'}
          onCanPlay={handleCanPlay}
          onError={(e) => console.error('Video error:', e)}
        />
      ) : (
        <Image
          src={src}
          blurDataURL={'/static/place.webp'}
          alt=""
          loading={'lazy'}
          width={0}
          height={0}
          sizes={'100vw'}
          decoding={'async'}
          className={'h-auto max-h-[484px] w-auto max-w-[484px] rounded-[10px] object-contain'}
          style={{ color: 'transparent' }}
        />
      )}
    </>
  )
}

export default MediaPlayer
