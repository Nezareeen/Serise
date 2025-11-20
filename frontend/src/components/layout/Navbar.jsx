import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
	const navigate = useNavigate()
	const [authed, setAuthed] = useState(() => !!localStorage.getItem('serise_token'))

	useEffect(()=>{
		const onStorage = (e) => {
			if (e.key === 'serise_token') setAuthed(!!e.newValue)
		}
		window.addEventListener('storage', onStorage)
		return () => window.removeEventListener('storage', onStorage)
	}, [])

	const logout = () => {
		localStorage.removeItem('serise_token')
		setOpen(false)
		setAuthed(false)
		navigate('/')
	}

	return (
		<header className={`${styles.header} ${open ? styles.menuActive : ''}`}>
			<div className={styles.container}>
				<div className={styles.brandWrap}>
					<div className={`${styles.logo} fleur-de-leah-regular`}>Serise</div>
				</div>

				{/* Desktop inline menu removed — hamburger dropdown is primary navigation on all screen sizes */}

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
				style={{
					maxHeight: open ? '420px' : '0',
					opacity: open ? 1 : 0,
					transform: open ? 'translateY(0)' : 'translateY(-6px)',
					pointerEvents: open ? 'auto' : 'none',
				}}
			>
				<ul className={styles.menuList}>
					<li className={styles.menuItem} role="none">
						<Link role="menuitem" to="/" onClick={() => setOpen(false)}>Home</Link>
					</li>
					<li className={styles.menuItem} role="none">
						<Link role="menuitem" to="/vault" onClick={() => setOpen(false)}>Memory Vault</Link>
					</li>
					<li className={styles.menuItem} role="none">
						<Link role="menuitem" to="/energy" onClick={() => setOpen(false)}>Energy Tracker</Link>
					</li>
					<li className={styles.menuItem} role="none">
						<Link role="menuitem" to="/overthinking" onClick={() => setOpen(false)}>Anti‑Overthinking</Link>
					</li>
					<li className={styles.menuItem} role="none">
						<Link role="menuitem" to="/simulate" onClick={() => setOpen(false)}>Simulator</Link>
					</li>
					<li className={styles.menuItem} role="none">
						<Link role="menuitem" to="/scripts" onClick={() => setOpen(false)}>Scripts</Link>
					</li>
					<li className={styles.menuItem} role="none">
						<Link role="menuitem" to="/goals" onClick={() => setOpen(false)}>Goals</Link>
					</li>

					{authed ? (
						<>
							<li className={styles.menuItem} role="none">
								<Link role="menuitem" to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
							</li>
							<li className={styles.menuItem} role="none">
								<Link role="menuitem" to="/profile" onClick={() => setOpen(false)}>Profile</Link>
							</li>
							<li className={styles.menuItem} role="none">
								<Link role="menuitem" to="/settings" onClick={() => setOpen(false)}>Settings</Link>
							</li>
							<li className={styles.menuItem} role="none">
								<button className={styles.logoutBtn} onClick={logout}>Logout</button>
							</li>
						</>
					) : (
						<>
							<li className={styles.menuItem} role="none">
								<Link role="menuitem" to="/auth/login" onClick={() => setOpen(false)}>Login</Link>
							</li>
							<li className={styles.menuItem} role="none">
								<Link role="menuitem" to="/auth/signup" onClick={() => setOpen(false)}>Sign up</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	)
}

export default NavBar
