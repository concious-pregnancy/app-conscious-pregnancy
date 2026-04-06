import styles from './Services.module.css'

const services = [
  {
    title: 'Functional Medicine + Western Labs',
    body: 'Comprehensive functional lab work: hormones at pregnancy-specific reference ranges, micronutrient status, toxin burden, immune function, gut health, and genetic markers. Not to find what is wrong, but to understand your unique biology and optimize it before conception.',
    image: '/hero-pic.webp',
  },
  {
    title: 'Traditional Chinese Medicine + Acupuncture',
    body: 'TCM has mapped the body\'s energetic landscape for thousands of years. We use this wisdom to identify where energy is blocked, depleted, or out of balance, and restore the flow that supports a thriving pregnancy and a thriving child.',
    image: '/hero-pic.webp',
  },
  {
    title: 'Somatic Healing Therapy',
    body: 'The body holds memory. Stress, trauma, and unprocessed emotion live in the tissues, and they can shape the environment your baby develops in. Somatic work gently helps you release what you have been carrying.',
    image: '/hero-pic.webp',
  },
  {
    title: 'Psychedelic Integration',
    body: 'For those ready to go deeper, psychedelic integration offers a pathway to profound clearing of patterns, beliefs, and emotional or ancestral material sitting beneath the surface. Preconception and postpartum work only.',
    image: '/hero-pic.webp',
  },
]

export default function Services() {
  return (
    <section id="services" data-section="services" className={styles.services}>
      <div className={styles.grid}>
        {services.map((s) => (
          <a key={s.title} href="#contact" className={styles.card} data-stagger>
            <div
              className={styles.cardImage}
              style={{ backgroundImage: `url(${s.image})` }}
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
              <span className={styles.readMore}>
                read more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
