/* eslint-disable jsx-a11y/media-has-caption */
'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const MediaPlayer = ({ src }) => {
  const [isVideo, setIsVideo] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']
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
    <div>
      {isVideo ? (
        <video
          key={src}
          ref={videoRef}
          src={src}
          // autoPlay // 自动播放
          muted
          loop
          preload={'auto'}
          className={'max-h-[500px] rounded-[10px]'}
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
          className={'h-auto w-7/12 rounded-[10px] object-contain'}
          style={{ color: 'transparent' }}
        />
      )}
    </div>
  )
}

export default MediaPlayer
