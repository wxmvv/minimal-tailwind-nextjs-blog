/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client'

import Player from './AudioPlayer'
import './index.css'
import { useState, useRef, useEffect } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
import { useTheme } from 'next-themes'
import music_light_riv from './music_light.riv'
import music_dark_riv from './music_dark.riv'
// import music_riv from './music.riv'

// https://audioplayer.madza.dev
// 参考 https://github.com/MoePlayer/react-aplayer
// aPlayer https://aplayer.js.org/#/zh-Hans/ecosystem
// MetingJS https://github.com/metowolf/MetingJS
// const INITIAL_STATE = generateShapes()

// TODO 使用supabase获取音频列表
// https://supabase.com/dashboard/project/yfkmvsfofvosjxtdoksz

const MyPlayer = () => {
  const { resolvedTheme } = useTheme()
  const tracks = [
    { url: '/bg_audio/植松伸夫 - フィナーレ.mp3', title: '植松伸夫 - フィナーレ', tags: ['se'] },
    {
      url: '/bg_audio/植松伸夫 - プレリュード.mp3',
      title: '植松伸夫 - プレリュード',
      tags: ['se'],
    },
    // { url: '/bg_audio/藤岡千尋 - ディープ.mp3', title: '藤岡千尋 - ディープ', tags: ['se'] },
    { url: '/bg_audio/笹井隆司 - 異郷の町.mp3', title: '笹井隆司 - 異郷の町', tags: ['se'] },
    { url: '/bg_audio/伊藤賢治 - Rising Sun.mp3', title: '伊藤賢治 - Rising Sun', tags: ['se'] },
    { url: '/bg_audio/植松伸夫 - 街のテーマ.mp3', title: '植松伸夫 - 街のテーマ', tags: ['se'] },
    { url: '/bg_audio/植松伸夫 - 怒闘.mp3', title: '植松伸夫 - 怒闘', tags: ['se'] },
    {
      url: '/bg_audio/植松伸夫 - コーネリア城.mp3',
      title: '植松伸夫 - コーネリア城',
      tags: ['se'],
    },
    {
      url: '/bg_audio/植松伸夫 - チョコボのテーマ.mp3',
      title: '植松伸夫 - チョコボのテーマ',
      tags: ['se'],
    },
  ]

  const [showPlayer, setShowPlayer] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const onMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowPlayer(true)
  }
  const onMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setShowPlayer(false)
    }, 1500)
  }
  const STATE_MACHINE_NAME = 'sm'
  const ON_BOOL_INPUT_NAME = 'play'

  const { rive, RiveComponent: RiveComponentPlayback } = useRive({
    src: resolvedTheme === 'dark' ? music_dark_riv : music_light_riv,
    stateMachines: 'sm',
    autoplay: true,
    onPause: () => {},
    onPlay: () => {
      // console.log('Animation is playing..')
      if (isPlaying) {
        onBoolInput && (onBoolInput.value = 1)
      } else {
        onBoolInput && (onBoolInput.value = 0)
      }
    },
  })

  // 这里是播放器是否播放
  const onBoolInput = useStateMachineInput(rive, STATE_MACHINE_NAME, ON_BOOL_INPUT_NAME)
  const [isPlaying, setIsPlaying] = useState(false)
  const handlePlayingChange = (playing) => {
    setIsPlaying(playing)
    if (playing) {
      onBoolInput && (onBoolInput.value = true)
    } else {
      onBoolInput && (onBoolInput.value = false)
    }
  }
  useEffect(() => {
    rive?.load({
      src: resolvedTheme === 'dark' ? music_dark_riv : music_light_riv,
      stateMachines: 'sm',
      autoplay: true,
    })
    setTimeout(() => {
      if (isPlaying) {
        onBoolInput && (onBoolInput.value = 1)
      } else {
        onBoolInput && (onBoolInput.value = 0)
      }
    }, 100)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTheme])

  return (
    <>
      <div className="fixed -right-5 bottom-0 md:right-12">
        <RiveComponentPlayback
          className="z-30 h-20 w-20"
          // onMouseEnter={() => onMouseEnter()}
          onMouseLeave={() => onMouseLeave()}
          // onClick={() => click()}
          onClick={() => setShowPlayer(!showPlayer)}
        />
      </div>
      <div
        className="fixed bottom-20 z-50 w-full origin-top-right overflow-hidden"
        style={{
          opacity: showPlayer ? 1 : 0,
          // height: '300px',
          right: showPlayer ? '30px' : '-330px',
          transition: 'all 0.3s ease',
          width: '260px',
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Player
          onPlayingChange={handlePlayingChange}
          trackList={tracks}
          includeTags={false}
          includeSearch={false}
          showPlaylist={true}
          sortTracks={false}
          autoPlayNextTrack={true}
        />
      </div>
    </>
  )
}

export default MyPlayer
