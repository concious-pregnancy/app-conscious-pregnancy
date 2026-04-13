import styles from "./Balance.module.css";

export default function Balance() {
  return (
    <section id="about" data-section="balance" className={styles.balance}>
      <div className={styles.inner} data-balance-inner>
        <div className={styles.content}>
          {/* Toggle */}
          <div className={styles.toggleWrap} data-balance-toggle>
            <span className={styles.toggleLabel}>Balance</span>
            <div className={styles.toggle}>
              <div className={styles.toggleSlider} data-balance-slider />
            </div>
          </div>

          {/* First text set (visible at start) */}
          <div className={styles.textBlock} data-balance-text-1>
            <p className={styles.label}>The Reframe</p>
            <h2 className={styles.heading}>Pregnancy prep is more than a checklist.</h2>
            <p className={styles.body}>
              Most preconception advice stops at take your folic acid, track your cycle, check your
              fertility. But you carry your history: your genetics, your gut health, your immune
              patterns, the generations before you.
            </p>
          </div>

          {/* Second text set (fades in as gradient shifts) */}
          <div className={styles.textBlock} data-balance-text-2>
            <h2 className={styles.heading}>
              The health and vitality you bring into conception is the very first gift you give your
              child.
            </h2>
            <p className={styles.body}>
              Conscious Pregnancy starts here: with the understanding that what you bring into
              conception shapes the world your child enters. A body prepared. A relationship
              strengthened. A home made ready.
            </p>
            <a href="#contact" className="btn btn-ghost-light">
              <span className="btn-dot" />
              Start Your Journey Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
