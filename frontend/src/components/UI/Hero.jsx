import React from 'react'
import styles from './Hero.module.css'

const Hero = () => {
	return (
		<section className={styles.hero} aria-labelledby="hero-heading">
			<div className={styles.container}>
				<h1 id="hero-heading" className={styles.title}>
					<span className={styles.line}>Small steps.</span>
					<span className={styles.linePrimary}>Stronger</span>
					<span className={styles.line}>Conversations.</span>
				</h1>

				<a className={styles.chevron} href="/auth" aria-label="Go to auth page">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
						<path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</a>
			</div>
		</section>
	)
}

export default Hero
