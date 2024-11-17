import React from 'react'
import styles from './Next.module.css'
import Image from 'next/image'
import SkipSvg from '../icons/skip.svg'

export const Next = ({ onClick }) => {
  // return <img className={styles.next} src={src} onClick={onClick} />;
  return <SkipSvg alt={'Next'} className={styles.next} onClick={onClick} />
}
