import styles from './Footer.module.css'

const links = [
  { label: 'Approach', href: '#approach' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Journal', href: '#journal' },
  { label: 'Book a Call', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.name}>Dr. Ashley Alden</p>
            <p className={styles.tagline}>
              Functional &amp; Integrative Medicine
            </p>
          </div>
          <nav className={styles.nav}>
            {links.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </nav>
        </div>
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Dr. Ashley Alden. All rights reserved.</p>
          <p>Venice, CA · Telehealth Nationwide</p>
        </div>
      </div>
    </footer>
  )
}
