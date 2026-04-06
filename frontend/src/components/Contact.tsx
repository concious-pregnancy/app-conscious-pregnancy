import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section id="contact" className={`${styles.contact} noise-overlay`}>
      <div className={styles.overlay} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.label}>Book a Call</p>
        <h2 className={styles.heading}>
          Ready to find<br />
          <em>your path?</em>
        </h2>
        <p className={styles.sub}>
          Start with a free 20-minute discovery call. No obligation —
          just an honest conversation about whether this is the right fit.
        </p>
        <div className={styles.actions}>
          <a href="mailto:hello@drashleyalden.com" className="btn btn-primary">
            <span className="btn-dot" />
            Book a Discovery Call
          </a>
          <a href="https://drashleyalden.com" className="btn btn-ghost-light" target="_blank" rel="noopener noreferrer">
            Visit Full Site
          </a>
        </div>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Location</span>
            <span>Venice, CA + Telehealth Nationwide</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Instagram</span>
            <span>@drashleyalden</span>
          </div>
          <div className={styles.detail}>
            <span className={styles.detailLabel}>Availability</span>
            <span>New patients welcome</span>
          </div>
        </div>
      </div>
    </section>
  )
}
