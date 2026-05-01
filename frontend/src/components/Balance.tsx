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
            <div className={styles.cta}>
              <a href="#contact" className="btn btn-ghost">
                Start Your Journey Together
                <span className="btn-dot" />
              </a>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.panelDark}`} data-balance-panel="dark">
            <p className={styles.eyebrow}>Prepping the Palace</p>
            <h2 className={styles.h2}>Pregnancy prep is more than a checklist.</h2>
            <p className={styles.body}>
              Most preconception advice stops at take your folic acid, track your cycle, check your
              fertility. But you carry your history: your genetics, your gut health, your immune
              patterns, the generations before you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
