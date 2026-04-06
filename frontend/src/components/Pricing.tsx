import styles from "./Pricing.module.css";

const tiers = [
  {
    name: "Her Preparation",
    price: "Discovery",
    period: "call first",
    desc: "For women preparing solo. Functional labs, acupuncture, somatic healing, and nutritional protocol across a 90-day preconception window.",
    features: [
      "Full functional lab panel",
      "Weekly acupuncture",
      "Somatic healing sessions",
      "Personalized supplement protocol",
      "Ongoing check-ins",
    ],
    featured: false,
  },
  {
    name: "Both of You",
    price: "Discovery",
    period: "call first",
    desc: "The full program for both partners. Paternal factors account for half of fertility challenges. Preparing together produces better outcomes than preparing alone.",
    features: [
      "Individual lab work for both",
      "Joint and individual sessions",
      "Partner nutrition protocol",
      "Stress and lifestyle optimization",
      "Full 90-day support",
    ],
    featured: true,
  },
  {
    name: "Integration Add-on",
    price: "Inquire",
    period: "for details",
    desc: "Psychedelic integration support for those who have done plant medicine work and want to process it in the context of preconception or postpartum.",
    features: [
      "Preconception or postpartum only",
      "Integration sessions",
      "Somatic support included",
      "No prior experience required",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" data-section="pricing" className={`section ${styles.pricing}`}>
      <div className="container">
        <div className={styles.header}>
          <p data-reveal className="section-label">
            The Program
          </p>
          <h2 data-reveal className={styles.heading}>
            This is not just
            <br />
            her journey.
          </h2>
        </div>

        <div className={styles.cards}>
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`${styles.card} ${t.featured ? styles.featured : ""}`}
              data-stagger
            >
              <div className={styles.cardTop}>
                <p className={styles.tierName}>{t.name}</p>
                <div className={styles.priceRow}>
                  <span className={styles.price}>{t.price}</span>
                  <span className={styles.period}>{t.period}</span>
                </div>
                <p className={styles.desc}>{t.desc}</p>
              </div>
              <ul className={styles.features}>
                {t.features.map((f) => (
                  <li key={f} className={styles.feature}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M2 7l3.5 3.5L12 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`btn ${t.featured ? "btn-primary" : "btn-ghost"} ${styles.cardCta}`}
              >
                <span className="btn-dot" />
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
