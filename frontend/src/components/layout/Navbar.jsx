import React, { useEffect, useState } from 'react'
import styles from './navBar.module.css'

const NavBar = () => {
	const [open, setOpen] = useState(false)

	useEffect(() => {
		// Try loading the local Fleur de Leah font from /fonts/ if present.
		// If it's not there the fallback font (Playfair Display) will be used.
		if (typeof window !== 'undefined' && 'FontFace' in window) {
			try {
				const face = new FontFace(
					'Fleur de Leah',
					"url('/fonts/FleurDeLeah-Regular.woff2') format('woff2')",
					{ display: 'swap' }
				)

				face.load()
					.then((loadedFace) => {
						document.fonts.add(loadedFace)
						document.documentElement.classList.add('fleur-loaded')
						console.log('Fleur de Leah loaded')
					})
					.catch((err) => {
						console.warn('Fleur de Leah failed to load:', err)
					})
			} catch (err) {
				console.warn('Font loading not supported:', err)
			}
		}
	}, [])

	// close on Escape or route change
	useEffect(() => {
		const onKey = (e) => {
			if (e.key === 'Escape' && open) setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [open])


	const toggle = () => setOpen((s) => !s)

	const menuItems = [
		{ label: 'Take Persona survey', href: '/survey' },
		{ label: 'Login', href: '/auth/login' },
		{ label: 'Sign up', href: '/auth/signup' },
	]

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.brandWrap}>
					<div className={`${styles.logo} fleur-de-leah-regular`}>Serise</div>
				</div>

				<button
					className={`${styles.hamburger} ${open ? styles.open : ''}`}
					aria-label={open ? 'Close menu' : 'Open menu'}
					aria-expanded={open}
					onClick={toggle}
				>
					<span />
					<span />
					<span />
				</button>
			</div>

			<nav
				className={`${styles.mobileMenu} ${open ? styles.open : ''}`}
				aria-hidden={!open}
				role="menu"
			>
				<ul className={styles.menuList}>
					{menuItems.map((m) => (
						<li key={m.href} className={styles.menuItem} role="none">
							<a role="menuitem" href={m.href} onClick={() => setOpen(false)}>
								{m.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default NavBar
