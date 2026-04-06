import styles from './Services.module.css'

const services = [
  {
    title: 'Functional Medicine',
    tags: ['Gut Health', 'Hormones', 'Autoimmune', 'Fatigue'],
    body: 'Comprehensive intake, advanced lab panels, and a personalized protocol addressing the upstream drivers of chronic illness — not just symptom management.',
  },
  {
    title: 'Psychedelic Integration',
    tags: ['Preparation', 'Integration', 'Trauma', 'Nervous System'],
    body: 'Evidence-informed support before and after psychedelic experiences. Working with what emerged — emotionally, somatically, and spiritually — to translate insight into lasting change.',
  },
  {
    title: 'Perimenopause & Hormonal Health',
    tags: ['Perimenopause', 'Fertility', 'Thyroid', 'Adrenal'],
    body: 'Hormonal transitions deserve more than a prescription. Ashley maps the full picture — cortisol, thyroid, sex hormones, and metabolic markers — to create a personalized support plan.',
  },
  {
    title: 'Acupuncture & Eastern Medicine',
    tags: ['Acupuncture', 'TCM', 'Pain', 'Nervous System'],
    body: 'Traditional Chinese medicine offers diagnostic frameworks that Western medicine misses entirely. Acupuncture and herbal protocols used alongside functional approaches for whole-system support.',
  },
]

export default function Services() {
  return (
    <section id="services" className={`${styles.services} noise-overlay`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label" style={{ color: 'var(--sage-light)' }}>
            Services
          </p>
          <h2 className={styles.heading}>
            Where to begin<br />
            <em>depends on you.</em>
          </h2>
          <p className={styles.sub}>
            Most patients work with Ashley across multiple modalities over time.
            These are the entry points.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s.title} className={styles.card}>
              <div className={styles.tags}>
                {s.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
              <a href="#contact" className={styles.cardLink}>
                Learn more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
