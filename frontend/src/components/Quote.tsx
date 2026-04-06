import styles from './Quote.module.css'

export default function Quote() {
  return (
    <section data-section="quote" className={styles.quote}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.stars} data-reveal aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="18" height="18" viewBox="0 0 18 18" fill="var(--sage)" aria-hidden="true">
                <path d="M9 1.5l2.12 4.3 4.74.69-3.43 3.34.81 4.72L9 12.27l-4.24 2.28.81-4.72L2.14 6.5l4.74-.7L9 1.5z" />
              </svg>
            ))}
          </div>
          <blockquote data-reveal className={styles.text}>
            &ldquo;Every cell in your future baby&rsquo;s body will be built from
            the nutrients you have available at conception. The 90-day preconception
            window is the most important nutritional window of your child&rsquo;s life.&rdquo;
          </blockquote>
          <cite data-reveal className={styles.author}>Lily Nichols, RDN, CDE</cite>
        </div>
      </div>
    </section>
  )
}
