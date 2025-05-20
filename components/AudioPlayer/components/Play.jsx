import React from 'react'
import styles from './Play.module.css'
import Image from 'next/image'
import PlaySvg from '../icons/play.svg'

export const Play = ({ onClick }) => {
  // return <img className={styles.play} src={src} onClick={onClick} />;
  return <PlaySvg alt={'Play'} className={styles.play} onClick={onClick} />
}
