import React from 'react'
import styles from './TagItem.module.css'

export const TagItem = ({ status, onClick, tag }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={`${styles.tag} ${status == 'active' ? styles.active : ''}`} onClick={onClick}>
      {tag}
    </div>
  )
}
