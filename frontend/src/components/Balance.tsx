import styles from "./Balance.module.css";

export default function Balance() {
  return (
    <section id="about" data-section="balance" className={`section ${styles.balance}`}>
      <div className={`container ${styles.inner}`}>
        {/* Lotus / TCM-inspired icon */}
        <svg data-reveal className={styles.icon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
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

        <p data-reveal className={styles.label}>
          The Invitation
        </p>

        <h2 data-reveal className={styles.heading}>
          The health and vitality you bring into conception is the very first gift you give your
          child.
        </h2>

        <p data-reveal className={styles.body}>
          Conscious Pregnancy starts here: with the understanding that what you bring into
          conception shapes the world your child enters. A body prepared. A relationship
          strengthened. A home made ready.
        </p>

        <a data-reveal href="#contact" className={`btn btn-ghost ${styles.cta}`}>
          <span className="btn-dot" />
          Start Your Journey Together
        </a>
      </div>
    </section>
  );
}
