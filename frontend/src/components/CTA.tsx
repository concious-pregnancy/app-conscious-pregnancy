import styles from "./CTA.module.css";

const avatars = ["/hero-pic.webp", "/hero-pic.webp", "/hero-pic.webp", "/hero-pic.webp"];

function Star() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="var(--sage)" aria-hidden="true">
      <path d="M9 1.5l2.12 4.3 4.74.69-3.43 3.34.81 4.72L9 12.27l-4.24 2.28.81-4.72L2.14 6.5l4.74-.7L9 1.5z" />
    </svg>
  );
}

export default function CTA() {
  return (
    <section data-section="cta" className={`section ${styles.cta}`}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left: content */}
          <div className={styles.left}>
            <h2 data-reveal className={styles.heading}>
              Ready to prepare
              <br />
              <em>with intention?</em>
            </h2>
            <p data-reveal className={styles.body}>
              Whether you are just beginning to think about conception or already on your way, this
              is a space to prepare with care, clarity, and clinical depth.
            </p>
            <a data-reveal href="#contact" className={`btn btn-primary ${styles.btn}`}>
              <span className="btn-dot" />
              Start Your Journey
            </a>
          </div>

          {/* Right: social proof */}
          <div className={styles.right} data-reveal>
            <p className={styles.trusted}>Trusted by 80+ clients</p>
            <div className={styles.avatarRow}>
              {avatars.map((src, i) => (
                <div key={i} className={styles.avatar}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
              <div className={styles.avatarMore}>+81</div>
            </div>

            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <span className={styles.ratingText}>Excellent 4.9 out of 5</span>
            </div>

            <p className={styles.chatLine}>
              Prefer to chat?{" "}
              <a href="mailto:hello@consciouspregnancy.com" className={styles.emailLink}>
                Send us an email
              </a>
            </p>

            <div className={styles.socialRow}>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className={styles.socialIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Threads */}
              <a href="#" aria-label="Threads" className={styles.socialIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M15.5 9.5c-1-2-3.5-2.5-5-.5s-1 5 1.5 6 5 .5 5.5-2-.5-5-2-5.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className={styles.socialIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className={styles.socialIcon}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2A29 29 0 0023 12a29 29 0 00-.46-5.58z" />
                  <polygon
                    points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
