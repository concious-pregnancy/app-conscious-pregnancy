import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={`${styles.hero} noise-overlay`}>
      {/* Dark gradient overlay */}
      <div className={styles.overlay} />

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Functional &amp; Integrative Medicine</p>

          <h1 className={styles.heading}>
            Medicine That Finds<br />
            <em>the Root Cause.</em>
          </h1>

          <p className={styles.sub}>
            For the patients who've been told their labs look fine, but they
            know something is wrong. Dr. Ashley Alden practices bio-individualized
            medicine at the intersection of functional, integrative, and
            psychedelic-informed care.
          </p>

          <div className={styles.actions}>
            <a href="#contact" className="btn btn-primary">
              <span className="btn-dot" />
              Book a Discovery Call
            </a>
            <a href="#approach" className="btn btn-ghost-light">
              The Approach
            </a>
          </div>

          <div className={styles.badges}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>Venice, CA</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>Telehealth Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
