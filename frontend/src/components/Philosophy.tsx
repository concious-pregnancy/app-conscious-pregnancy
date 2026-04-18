import styles from "./Philosophy.module.css";

const HEADING =
  "These are not separate modalities stitched together. They are four lenses on the same truth: your whole self, physical, energetic, and emotional, shapes the life you are about to create.";

export default function Philosophy() {
  const tokens = HEADING.split(/(\s+)/);

  return (
    <section id="philosophy" data-section="philosophy" className={styles.philosophy}>
      <div className={styles.inner}>
        <svg
          className={styles.icon}
          viewBox="0 0 48 48"
          width="44"
          height="44"
          fill="none"
          aria-hidden="true"
        >
          <g fill="currentColor">
            <rect x="6" y="6" width="36" height="2.6" />
            <rect x="6" y="13" width="36" height="2.6" />
            <rect x="6" y="20" width="36" height="2.6" />
            <rect x="6" y="29" width="15" height="2.6" />
            <rect x="27" y="29" width="15" height="2.6" />
            <rect x="6" y="36" width="15" height="2.6" />
            <rect x="27" y="36" width="15" height="2.6" />
            <rect x="6" y="43" width="15" height="1.6" />
            <rect x="27" y="43" width="15" height="1.6" />
          </g>
        </svg>

        <p className={styles.eyebrow}>Prepping the Palace</p>

        <h2 className={styles.h2} data-philo-heading>
          {tokens.map((tok, i) =>
            /^\s+$/.test(tok) ? (
              <span key={i}>{tok}</span>
            ) : (
              <span key={i} className={styles.word} data-philo-word>
                {tok}
              </span>
            ),
          )}
        </h2>

        <a href="#process" className={`btn btn-primary ${styles.pill}`}>
          How We Work Together
          <span className="btn-dot" />
        </a>
      </div>
      <div className={styles.footnote}>Real People. Real Change.</div>
    </section>
  );
}
