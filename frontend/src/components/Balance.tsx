import styles from "./Balance.module.css";

export default function Balance() {
  return (
    <section id="about" data-section="balance" className={styles.balance}>
      <div className={styles.stage} data-balance-stage>
        <div className={styles.arcs} aria-hidden="true">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            <ellipse className={styles.arc} cx="200" cy="500" rx="720" ry="520" />
            <ellipse className={styles.arc} cx="1400" cy="400" rx="680" ry="560" />
          </svg>
        </div>

        <div className={styles.toggleWrap}>
          <span className={styles.toggleLabel}>Balance</span>
          <button className={styles.toggle} data-balance-toggle aria-label="Toggle balance state">
            <span className={styles.toggleDot} data-balance-slider />
          </button>
        </div>

        <div className={styles.panels}>
          <div className={`${styles.panel} ${styles.panelLight}`} data-balance-panel="light">
            <svg className={styles.icon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M32 8c0 0 6 12 6 24s-6 24-6 24-6-12-6-24S32 8 32 8z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M32 20c0 0-14 4-20 14s-4 20-4 20 14-4 20-14 4-20 4-20z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M32 20c0 0 14 4 20 14s4 20 4 20-14-4-20-14-4-20-4-20z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <p className={styles.eyebrow}>The Invitation</p>
            <h2 className={styles.h2}>
              The health and vitality you bring into conception is the very first gift you give your
              child.
            </h2>
            <p className={styles.body}>
              Conscious Pregnancy starts here: with the understanding that what you bring into
              conception shapes the world your child enters. A body prepared. A relationship
              strengthened. A home made ready.
            </p>
          </div>

          <div className={`${styles.panel} ${styles.panelDark}`} data-balance-panel="dark">
            <svg className={styles.icon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <path
                d="M32 8c0 0 6 12 6 24s-6 24-6 24-6-12-6-24S32 8 32 8z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M32 20c0 0-14 4-20 14s-4 20-4 20 14-4 20-14 4-20 4-20z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M32 20c0 0 14 4 20 14s4 20 4 20-14-4-20-14-4-20-4-20z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            <p className={styles.eyebrow}>Prepping the Palace</p>
            <h2 className={styles.h2}>
              Both partners. One window. The most important preparation you will ever make.
            </h2>
            <p className={styles.body}>
              In TCM, the palace is prepared before the new life takes up residence. The 90-day
              preconception window is that preparation. What you bring into conception, physically,
              emotionally, energetically, becomes the very first environment your child knows.
            </p>
            <div className={styles.cta}>
              <a href="#contact" className="btn btn-ghost-light">
                Start Your Journey Together
                <span className="btn-dot" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
