import React from 'react'
import styles from './Loop.module.css'
import LoopSvg from '../icons/loop-all.svg'

export const Loop = ({ isLooped, onClick }) => {
  // return <img className={styles.loop} src={src} onClick={onClick} />;
  return (
    <LoopSvg
      alt={'Loop'}
      // className={styles.loop}
      className={isLooped ? styles.loop : `${styles.loop} ${styles.disabled}`}
      // src={src}
      onClick={onClick}
    />
  )
}
