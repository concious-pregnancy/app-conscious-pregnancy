import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section data-section="hero" className={styles.hero}>
      <div className={styles.background} data-hero-primary data-parallax-speed="0.25" />
      <div className={styles.tint} />
      <div className={styles.overlay} />

      <div className={styles.inner}>
        <h1 data-reveal className={styles.heading}>
          Before the Baby,
          <br />
          <em>There Is You.</em>
        </h1>
        <p data-reveal className={styles.sub}>
          A whole-body, whole-partnership approach to preparing for one of the most profound
          experiences of your life. What you bring into conception shapes the world your child
          enters.
        </p>
        <a data-reveal href="#contact" className={`btn btn-ghost-light ${styles.cta}`}>
          <span className="btn-dot" />
          Start Your Journey Together
        </a>
      </div>

      <div className={styles.foot} aria-hidden="true">
        <span className={styles.footLabel}>Four lenses · one preparation</span>

        <div className={styles.pillars}>
          <span className={styles.pillar}>
            <svg viewBox="0 0 34 22" width="28" height="18" aria-hidden="true">
              <g fill="currentColor">
                <rect x="0" y="1" width="34" height="2" />
                <rect x="0" y="10" width="34" height="2" />
                <rect x="0" y="19" width="34" height="2" />
              </g>
            </svg>
            Functional Medicine
          </span>
          <span className={styles.pillar}>
            <svg viewBox="0 0 34 22" width="28" height="18" aria-hidden="true">
              <g fill="currentColor">
                <rect x="0" y="1" width="14" height="2" />
                <rect x="20" y="1" width="14" height="2" />
                <rect x="0" y="10" width="34" height="2" />
                <rect x="0" y="19" width="14" height="2" />
                <rect x="20" y="19" width="14" height="2" />
              </g>
            </svg>
            Eastern Medicine
          </span>
          <span className={styles.pillar}>
            <svg viewBox="0 0 34 22" width="28" height="18" aria-hidden="true">
              <g fill="currentColor">
                <rect x="0" y="1" width="34" height="2" />
                <rect x="0" y="10" width="34" height="2" />
                <rect x="0" y="19" width="14" height="2" />
                <rect x="20" y="19" width="14" height="2" />
              </g>
            </svg>
            Somatic Therapy
          </span>
          <span className={styles.pillar}>
            <svg viewBox="0 0 34 22" width="28" height="18" aria-hidden="true">
              <g fill="currentColor">
                <rect x="0" y="1" width="14" height="2" />
                <rect x="20" y="1" width="14" height="2" />
                <rect x="0" y="10" width="14" height="2" />
                <rect x="20" y="10" width="14" height="2" />
                <rect x="0" y="19" width="34" height="2" />
              </g>
            </svg>
            Pre-Conception Healing & Integration
          </span>
        </div>


      </div>
    </section>
  );
}
