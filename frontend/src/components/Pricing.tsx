import styles from "./Pricing.module.css";

type PricingTier = {
  _id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  featured?: boolean;
  features: string[];
  herFeatures?: string[];
  hisFeatures?: string[];
};

type PricingSection = {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2?: string;
  sub?: string;
  ctaLabel?: string;
} | null;

export default function Pricing({
  tiers,
  sectionContent,
}: {
  tiers: PricingTier[];
  sectionContent?: PricingSection;
}) {
  const eyebrow = sectionContent?.eyebrow ?? "The Program";
  const line1 = sectionContent?.headingLine1 ?? "This is not just";
  const line2 = sectionContent?.headingLine2 ?? "her journey.";
  const sub =
    sectionContent?.sub ??
    "A first session is often just a conversation, a starting point. From there, you choose the pace and depth of support that feels right for you.";
  const ctaLabel = sectionContent?.ctaLabel ?? "Get Started";

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
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 className={styles.h2}>
          {line1}
          <br />
          {line2}
        </h2>
        <p className={styles.sub}>{sub}</p>
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => (
          <article
            key={tier._id}
            className={`${styles.tier} ${tier.featured ? styles.tierFeat : ""}`}
          >
            <h3 className={styles.tierName}>{tier.name}</h3>
            <p className={styles.tierDesc}>{tier.description}</p>
            {tier.herFeatures?.length || tier.hisFeatures?.length ? (
              <div className={styles.featureGroups}>
                {tier.herFeatures?.length ? (
                  <div className={styles.featureGroup}>
                    <p className={styles.featureGroupLabel}>Her</p>
                    <ul className={styles.features}>
                      {tier.herFeatures.map((f) => (
                        <li key={f}>
                          <svg
                            className={styles.check}
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="8.5"
                              stroke="currentColor"
                              strokeWidth="1.25"
                            />
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
                  </div>
                ) : null}
                {tier.hisFeatures?.length ? (
                  <div className={styles.featureGroup}>
                    <p className={styles.featureGroupLabel}>Him</p>
                    <ul className={styles.features}>
                      {tier.hisFeatures.map((f) => (
                        <li key={f}>
                          <svg
                            className={styles.check}
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              cx="10"
                              cy="10"
                              r="8.5"
                              stroke="currentColor"
                              strokeWidth="1.25"
                            />
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
                  </div>
                ) : null}
              </div>
            ) : (
              <ul className={styles.features}>
                {tier.features?.map((f) => (
                  <li key={f}>
                    <svg
                      className={styles.check}
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                    >
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
            )}
            <div className={styles.cta}>
              <a href="#contact" className={`btn ${styles.tierBtn}`}>
                {ctaLabel}
                <span className="btn-dot" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
