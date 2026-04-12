import styles from "./Balance.module.css";

export default function Balance() {
  return (
    <section id="about" data-section="balance" className={styles.balance}>
      <div className={styles.top}>
        <div className="container">
          <p data-reveal className={styles.label}>
            The Reframe
          </p>
          <h2 data-reveal className={styles.heading}>
            Pregnancy prep is more than a checklist.
          </h2>
          <p data-reveal className={styles.body}>
            Most preconception advice stops at take your folic acid, track your cycle, check your
            fertility. But you carry your history: your genetics, your gut health, your immune
            patterns, the generations before you.
          </p>
        </div>
      </div>

      <div className={`${styles.bottom} noise-overlay`}>
        <div className="container">
          <h2 data-reveal className={styles.headingLight}>
            The health and vitality you bring into conception is the very first gift you give your
            child.
          </h2>
          <p data-reveal className={styles.bodyLight}>
            Conscious Pregnancy starts here: with the understanding that what you bring into
            conception shapes the world your child enters. A body prepared. A relationship
            strengthened. A home made ready.
          </p>
          <a data-reveal href="#contact" className="btn btn-ghost-light">
            <span className="btn-dot" />
            Start Your Journey Together
          </a>
        </div>
      </div>
    </section>
  );
}
