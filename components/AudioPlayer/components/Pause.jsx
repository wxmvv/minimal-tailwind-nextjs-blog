import React from 'react'
import styles from './Pause.module.css'
import Image from 'next/image'
import PauseSvg from '../icons/pause.svg'

export const Pause = ({ onClick }) => {
  // return <img className={styles.pause} src={src} onClick={onClick} />;
  return <PauseSvg alt={'Pause'} className={styles.pause} onClick={onClick} />
}
