import styles from './Philosophy.module.css'

export default function Philosophy() {
  return (
    <section data-section="philosophy" className={`section ${styles.philosophy}`}>
      <div className="container">
        <p data-reveal className={styles.label}>Prepping the Palace</p>
        <h2 data-reveal className={styles.heading}>
          These are not separate modalities stitched together. They are four lenses
          on the same truth: your whole self, physical, energetic, and emotional,
          shapes the life you are about to create.
        </h2>
        <a data-reveal href="#process" className={`btn btn-ghost ${styles.cta}`}>
          <span className="btn-dot" />
          How We Work Together
        </a>
      </div>
    </section>
  )
}
