import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section data-section="philosophy" className={`section ${styles.philosophy}`}>
      <div className={`container ${styles.inner}`}>
        {/* Decorative icon — lotus / TCM-inspired */}
        <svg data-reveal className={styles.icon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          {/* Center petal */}
          <path
            d="M32 8c0 0 6 12 6 24s-6 24-6 24-6-12-6-24S32 8 32 8z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Left petal */}
          <path
            d="M32 20c0 0-14 4-20 14s-4 20-4 20 14-4 20-14 4-20 4-20z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Right petal */}
          <path
            d="M32 20c0 0 14 4 20 14s4 20 4 20-14-4-20-14-4-20-4-20z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        <p data-reveal className={styles.label}>
          Prepping the Palace
        </p>

        <h2 data-reveal className={styles.heading}>
          These are not separate modalities stitched together. They are four lenses on the same
          truth: your whole self, physical, energetic, and emotional, shapes the life you are about
          to create.
        </h2>

        <a data-reveal href="#process" className={`btn btn-ghost ${styles.cta}`}>
          <span className="btn-dot" />
          How We Work Together
        </a>
      </div>
    </section>
  );
}
