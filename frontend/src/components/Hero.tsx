import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section data-section="hero" className={styles.hero}>
      <div className={styles.background} data-hero-primary data-parallax-speed="0.25" />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <h1 data-reveal className={styles.heading}>
          Before the Baby,<br /><em>There Is You.</em>
        </h1>
        <p data-reveal className={styles.sub}>
          A whole-body, whole-partnership approach to preparing for one of the
          most profound experiences of your life. What you bring into conception
          shapes the world your child enters.
        </p>
        <a data-reveal href="#contact" className={`btn btn-ghost-light ${styles.cta}`}>
          <span className="btn-dot" />
          Start Your Journey Together
        </a>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span />
      </div>
    </section>
  )
}
