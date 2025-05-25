import React from 'react'
import styles from './Previous.module.css'
import Image from 'next/image'
import SkipSvg from '../icons/skip.svg'

export const Previous = ({ onClick }) => {
  // return <img className={styles.previous} src={src} onClick={onClick} />;
  return <SkipSvg alt={'Previous'} className={styles.previous} onClick={onClick} />
}
