import React from 'react'
import styles from './PageTemplate.module.css'

export const PageTemplate = ({ children }) => {
  // return <div style={{ height: '100%', borderRadius: '20px' }}>{children}</div>
  return <div className={styles.pagetemplate}>{children}</div>
}
