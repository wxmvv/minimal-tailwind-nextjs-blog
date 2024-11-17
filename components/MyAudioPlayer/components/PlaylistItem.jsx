import React from 'react'
import styles from './PlaylistItem.module.css'

export const PlaylistItem = ({ status, data_key, src, title, onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <p
      className={`${styles.item} ${status === 'active' ? styles.active : ''}`}
      data-key={data_key}
      src={src}
      title={title}
      onClick={onClick}
    >
      {title}
    </p>
  )
}
