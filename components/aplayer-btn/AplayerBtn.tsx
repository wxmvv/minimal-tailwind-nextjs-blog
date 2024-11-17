'use client'
import { APlayer, type AudioInfo } from '../aplayer-react'
import { useState } from 'react'

const playlist1 = [
  // https://music.163.com/#/album?id=94187908
  // {
  //   name: 'Dancing with my phone',
  //   artist: {
  //     name: 'HYBS',
  //     url: 'https://music.163.com/#/artist?id=49713779',
  //   },
  //   url: 'https://music.163.com/song/media/outer/url?id=1969744125',
  //   cover: 'https://p1.music.126.net/tOtUdKjS9rktAFRamcomWQ==/109951167748733958.jpg',

  // {
  //   name: '海辺の丘',
  //   artist: '小瀬村晶/信澤宣明',
  //   url: 'https://music.163.com/song/media/outer/url?id=1331298993',
  //   cover: 'https://p1.music.126.net/RzAd3yEwGX6PW7LEQtK6mA==/109951163707194914.jpg',
  // },
  // {
  //   name: '滥俗的歌',
  //   artist: '汉堡黄',
  //   url: 'https://music.163.com/song/media/outer/url?id=1923210613',
  //   cover: 'https://p1.music.126.net/uOvEut2NG6enWVM1s_lJZQ==/109951167656922852.jpg',
  // },
  {
    url: '/bg_audio/植松伸夫 - フィナーレ.mp3',
    name: '植松伸夫 - フィナーレ',
    artist: '植松伸夫',
    tags: ['se'],
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/植松伸夫 - プレリュード.mp3',
    name: '植松伸夫 - プレリュード',
    tags: ['se'],
    artist: '植松伸夫',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/藤岡千尋 - ディープ.mp3',
    name: '藤岡千尋 - ディープ',
    tags: ['se'],
    artist: '藤岡千尋',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/笹井隆司 - 異郷の町.mp3',
    name: '笹井隆司 - 異郷の町',
    tags: ['se'],
    artist: '笹井隆司',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/伊藤賢治 - Rising Sun.mp3',
    name: '伊藤賢治 - Rising Sun',
    tags: ['se'],
    artist: '伊藤賢治',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/植松伸夫 - 街のテーマ.mp3',
    name: '植松伸夫 - 街のテーマ',
    tags: ['se'],
    artist: '植松伸夫',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/植松伸夫 - 怒闘.mp3',
    name: '植松伸夫 - 怒闘',
    tags: ['se'],
    artist: '植松伸夫',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/植松伸夫 - コーネリア城.mp3',
    name: '植松伸夫 - コーネリア城',
    tags: ['se'],
    artist: '植松伸夫',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
  {
    url: '/bg_audio/植松伸夫 - チョコボのテーマ.mp3',
    name: '植松伸夫 - チョコボのテーマ',
    tags: ['se'],
    artist: '植松伸夫',
    cover: 'http://p1.music.126.net/yIDfwqYo9AoIVI09cDIA3w==/109951165250070968.jpg',
  },
]

export function AplayerBtn() {
  const [playlist] = useState<AudioInfo[]>(playlist1)
  return (
    <div
      className="fixed bottom-0 left-0"
      style={
        {
          // width: '300px',
          // height: '100px',
          // display: 'flex',
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
        }
      }
    >
      {/* <div style={{ width: 1000 }}> */}
      <APlayer
        theme="auto"
        audio={playlist}
        appearance="fixed"
        // volume={}
        initialLoop="all"
        // initialOrder="random"
        autoPlay={false}
        listMaxHeight={200}
      />
      {/* </div> */}
    </div>
  )
}
