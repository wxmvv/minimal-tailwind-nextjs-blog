'use client'

import { useState, useRef } from 'react'

interface SimpleAudioPlayerProps {
  src: string
  alt?: string
  title?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

const SimpleAudioPlayer = ({
  src,
  alt = '',
  title,
  autoPlay = false,
  loop = false,
  muted = false,
}: SimpleAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch((err) => {
          console.error('播放失败:', err)
          setError(`播放失败: ${err.message}`)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      if (audioRef.current.duration && audioRef.current.duration !== Infinity) {
        setDuration(audioRef.current.duration)
      }
    }
  }

  const handleLoadedData = () => {
    if (audioRef.current && audioRef.current.duration !== Infinity) {
      setDuration(audioRef.current.duration)
    }
    setError(null)
  }

  const handleError = () => {
    if (audioRef.current) {
      const errorCode = audioRef.current.error?.code
      let errorMessage = '音频加载失败'
      switch (errorCode) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = '播放已中止'
          break
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = '网络错误'
          break
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = '解码错误'
          break
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = '不支持的音频格式'
          break
      }
      setError(errorMessage)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="audio-player my-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="audio-header border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {title || alt || '音频播放'}
            </h4>
            {src && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {src.split('/').pop()}
              </p>
            )}
          </div>
          <button
            onClick={handlePlayPause}
            className="rounded-full bg-blue-100 p-2 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
            aria-label={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? (
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="audio-content bg-white p-4 dark:bg-gray-900">
        {error ? (
          <div className="error-message rounded-md border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              直接下载音频文件
            </a>
          </div>
        ) : (
          <>
            <div className="progress-bar mb-4">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : '--:--'}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                    duration ? (currentTime / duration) * 100 : 0
                  }%, #e5e7eb ${duration ? (currentTime / duration) * 100 : 0}%, #e5e7eb 100%)`,
                }}
              />
            </div>

            <audio
              ref={audioRef}
              src={src}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              controls={false} // 使用自定义控件
              onTimeUpdate={handleTimeUpdate}
              onLoadedData={handleLoadedData}
              onError={handleError}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            >
              <track kind="captions" />
            </audio>

            <div className="audio-controls flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePlayPause}
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {isPlaying ? '暂停' : '播放'}
                </button>
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0
                      if (isPlaying) {
                        audioRef.current.play()
                      }
                    }
                  }}
                  className="rounded bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  重播
                </button>
              </div>

              <div className="volume-control flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">音量</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  defaultValue="1"
                  onChange={(e) => {
                    if (audioRef.current) {
                      audioRef.current.volume = parseFloat(e.target.value)
                    }
                  }}
                  className="h-2 w-20 cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="audio-footer border-t border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline dark:text-blue-400"
        >
          在新窗口中播放或下载
        </a>
      </div>
    </div>
  )
}

export default SimpleAudioPlayer
