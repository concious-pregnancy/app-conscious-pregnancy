'use client'

import styles from './Footer.module.css'

const sitemapGroups = [
  {
    title: 'Sitemap',
    links: [
      { label: 'Home', href: '#' },
      { label: 'The Reframe', href: '#about' },
      { label: 'Modalities', href: '#services' },
      { label: 'How It Works', href: '#process' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Journal', href: '#journal' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.newsletter}>
          <h2 data-reveal className={styles.nlTitle}>
            Stay in the<br />Know.
          </h2>
          <p data-reveal className={styles.nlBody}>
            Occasional notes on preconception nutrition, functional medicine,
            TCM, and what the research actually says about preparing your body
            and your partnership for what comes next.
          </p>
          <form className={styles.nlForm} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.nlInput}
              aria-label="Email for newsletter"
            />
            <button type="submit" className={`btn btn-primary ${styles.nlBtn}`}>
              <span className="btn-dot" />
              Subscribe
            </button>
          </form>
          <p className={styles.nlDisclaimer}>
            By signing up to receive emails from Conscious Pregnancy, you agree to our Privacy Policy.
          </p>
        </div>

        <div className={styles.columns}>
          {sitemapGroups.map((g) => (
            <div key={g.title} className={styles.column}>
              <p className={styles.columnTitle}>{g.title}</p>
              <nav className={styles.columnNav}>
                {g.links.map((l) => (
                  <a key={l.label} href={l.href}>{l.label}</a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Conscious Pregnancy. All rights reserved.</p>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
