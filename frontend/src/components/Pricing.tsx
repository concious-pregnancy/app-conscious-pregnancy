import styles from "./Pricing.module.css";

const tiers = [
  {
    name: "Hers",
    desc: "Explore therapy at your own pace.",
    price: "$49",
    unit: "/ month",
    features: [
      "Dedicated therapist",
      "Online or in-person",
      "Personalized goal-setting",
      "Client portal access",
    ],
  },
  {
    name: "His",
    desc: "Ongoing support for continued growth.",
    price: "$89",
    unit: "/ month",
    features: [
      "Everything in Starter",
      "More flexible scheduling",
      "Progress tracking",
      "Extra resources",
    ],
    featured: true,
  },
  {
    name: "Theirs",
    desc: "Consistent support with full access.",
    price: "$229",
    unit: "/ month",
    features: [
      "All Growth features",
      "Extended sessions",
      "Priority booking",
      "Direct therapist messaging",
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" data-section="pricing" className={styles.pricing}>
      <div className={styles.head}>
        <svg className={styles.waveIcon} viewBox="0 0 80 40" fill="none" aria-hidden="true">
          <path
            d="M4 12 C12 4, 20 20, 28 12 S44 4, 52 12 S68 20, 76 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4 22 C12 14, 20 30, 28 22 S44 14, 52 22 S68 30, 76 22"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4 32 C12 24, 20 40, 28 32 S44 24, 52 32 S68 40, 76 32"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <p className={styles.eyebrow}>The Program</p>
        <h2 className={styles.h2}>
          This is not just
          <br />
          her journey.
        </h2>
        <p className={styles.sub}>
          A first session is often just a conversation, a starting point. From there, you choose the
          pace and depth of support that feels right for you.
        </p>
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => (
          <article
            key={tier.name}
            className={`${styles.tier} ${tier.featured ? styles.tierFeat : ""}`}
          >
            <h3 className={styles.tierName}>{tier.name}</h3>
            <p className={styles.tierDesc}>{tier.desc}</p>
            <ul className={styles.features}>
              {tier.features.map((f) => (
                <li key={f}>
                  <svg className={styles.check} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.25" />
                    <path
                      d="M6.5 10.5l2.5 2.5 4.5-5"
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
            <div className={styles.cta}>
              <a href="#contact" className={`btn ${styles.tierBtn}`}>
                Get Started
                <span className="btn-dot" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
