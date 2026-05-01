import styles from "./Ready.module.css";

export default function Ready() {
  return (
    <section id="ready" data-section="ready" className={styles.ready}>
      <div className={styles.curve} aria-hidden="true">
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none">
          <path
            d="M -50 80
               C 320 20, 540 320, 820 200
               S 1280 60, 1450 280
               C 1560 420, 1100 540, 760 460
               S 240 520, -50 380"
          />
          <path
            d="M 100 540
               C 360 420, 700 460, 980 380
               S 1500 240, 1700 320"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        <p className={styles.eyebrow} data-reveal>
          Begin Together
        </p>
        <h2 className={styles.h2} data-reveal>
          Ready to <em>prepare the palace?</em>
        </h2>
        <p className={styles.sub} data-reveal>
          Most couples start with the discovery call. No commitment, just a clear look at what your
          bodies are asking for.
        </p>

        <div className={styles.trust} data-reveal>
          <div className={styles.avatars} aria-hidden="true">
            <span
              className={styles.av}
              style={{ backgroundImage: "linear-gradient(135deg, #cdd9d2, #a8c5be)" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "linear-gradient(135deg, #d8c8b6, #b39a7a)" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "linear-gradient(135deg, #c2b8a3, #8a7e69)" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "linear-gradient(135deg, #b9c9bf, #7fa69b)" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "linear-gradient(135deg, #e0d5c4, #c2a988)" }}
            />
            <span className={`${styles.av} ${styles.avCount}`}>+12</span>
          </div>
          <p className={styles.trustLabel}>
            Trusted by couples preparing intentionally for conception.
          </p>
        </div>

        <div className={styles.ctas} data-reveal>
          <a href="#contact" className={`btn ${styles.pill}`}>
            Book the Discovery Call
            <span className="btn-dot" />
          </a>
          <a href="#services" className={styles.link}>
            The Approach &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
