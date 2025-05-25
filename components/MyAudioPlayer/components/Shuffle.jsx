import React from 'react'
import styles from './Shuffle.module.css'
import Image from 'next/image'
import OrderRandomSvg from '../icons/order-random.svg'

export const Shuffle = ({ isShuffled, onClick }) => {
  // return <img className={styles.shuffle} src={src} onClick={onClick} />;
  return (
    <OrderRandomSvg
      alt={'Shuffle'}
      className={isShuffled ? styles.shuffle : `${styles.shuffle} ${styles.disabled}`}
      onClick={onClick}
    />
  )
}
