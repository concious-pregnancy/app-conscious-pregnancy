'use client'

import { useState, useEffect } from 'react'
import styles from './Nav.module.css'

const links = [
  { href: '#approach', label: 'Approach' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#journal', label: 'Journal' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#" className={styles.logo}>
        Dr. Ashley Alden
      </a>

      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>

      <a href="#contact" className={`btn btn-primary ${styles.cta}`}>
        <span className="btn-dot" />
        Book a Call
      </a>
    </nav>
  )
}
