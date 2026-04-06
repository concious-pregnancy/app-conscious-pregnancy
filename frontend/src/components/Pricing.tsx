import styles from './Pricing.module.css'

const plans = [
  {
    name: 'Discovery',
    price: 'Free',
    duration: '20 min',
    desc: 'A no-obligation call to see if working together is the right fit.',
    features: [
      'Overview of your health history',
      'Ashley\'s initial impressions',
      'Recommended next steps',
      'No sales pitch',
    ],
    cta: 'Book a Call',
    featured: false,
  },
  {
    name: 'Initial Consultation',
    price: '$450',
    duration: '90 min',
    desc: 'The full intake. This is where real functional medicine begins.',
    features: [
      'Comprehensive health history',
      'Lab review and interpretation',
      'Initial protocol recommendations',
      'Custom supplement plan',
      '30-day follow-up included',
    ],
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Ongoing Care',
    price: '$250',
    duration: '45 min',
    desc: 'Regular follow-ups to adjust the protocol and support your progress.',
    features: [
      'Protocol review and adjustments',
      'Lab result interpretation',
      'Supplement and nutrition refinements',
      'Psychedelic integration support',
    ],
    cta: 'Book Follow-Up',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className={`section surface-off-white ${styles.pricing}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">Investment</p>
          <h2 className="section-title">
            What working together<br />
            <em>actually costs.</em>
          </h2>
          <p className="section-body">
            No membership fees, no surprise charges. Insurance does not cover
            functional medicine — but for many patients, this is the first care
            that actually helps.
          </p>
        </div>

        <div className={styles.cards}>
          {plans.map((p) => (
            <div key={p.name} className={`${styles.card} ${p.featured ? styles.featured : ''}`}>
              {p.featured && <div className={styles.badge}>Most Popular</div>}
              <div className={styles.cardTop}>
                <p className={styles.planName}>{p.name}</p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{p.price}</span>
                  <span className={styles.duration}>/ {p.duration}</span>
                </div>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'} ${styles.cardCta}`}>
                <span className="btn-dot" />
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          Lab costs billed separately through your insurance or direct pay. Ashley will
          walk you through expected costs before ordering anything.
        </p>
      </div>
    </section>
  )
}
