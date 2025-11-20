import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo" aria-label="Site footer">
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo} aria-hidden>Serise</div>
          <div className={styles.copy}>© 2025 Serise Inc.</div>
        </div>

        <div className={styles.right}>
          <span className={styles.word}>Calm.</span>
          <span className={`${styles.word} ${styles.highlight}`}>Clarity.</span>
          <span className={styles.word}>Confidence.</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
