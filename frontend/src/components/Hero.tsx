import styles from "./Hero.module.css";

const images = [
  { key: "leaves", src: "/hero/hero-leaves.jpeg" },
  { key: "water", src: "/hero/hero-water.jpeg" },
  { key: "eye", src: "/hero/hero-eye.jpeg" },
  { key: "flame", src: "/hero/hero-flame.jpeg" },
  { key: "kimono", src: "/hero/hero-kimono.jpeg" },
  { key: "golden", src: "/hero/hero-golden.jpg" },
] as const;

const ACTIVE_IMAGE = "golden";

const pillars = [
  {
    label: "Functional Medicine",
    bars: (
      <>
        <rect x="0" y="1" width="34" height="2" />
        <rect x="0" y="10" width="34" height="2" />
        <rect x="0" y="19" width="34" height="2" />
      </>
    ),
  },
  {
    label: "Eastern Medicine",
    bars: (
      <>
        <rect x="0" y="1" width="14" height="2" />
        <rect x="20" y="1" width="14" height="2" />
        <rect x="0" y="10" width="34" height="2" />
        <rect x="0" y="19" width="14" height="2" />
        <rect x="20" y="19" width="14" height="2" />
      </>
    ),
  },
  {
    label: "Somatic Therapy",
    bars: (
      <>
        <rect x="0" y="1" width="34" height="2" />
        <rect x="0" y="10" width="34" height="2" />
        <rect x="0" y="19" width="14" height="2" />
        <rect x="20" y="19" width="14" height="2" />
      </>
    ),
  },
  {
    label: "Pre-Conception Healing & Integration",
    bars: (
      <>
        <rect x="0" y="1" width="14" height="2" />
        <rect x="20" y="1" width="14" height="2" />
        <rect x="0" y="10" width="14" height="2" />
        <rect x="20" y="10" width="14" height="2" />
        <rect x="0" y="19" width="34" height="2" />
      </>
    ),
  },
];

type HeroContent = {
  eyebrow?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subheading?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  credentials?: string;
  footLabel?: string;
} | null;

export default function Hero({ content }: { content?: HeroContent }) {
  const eyebrow = content?.eyebrow ?? "Preconception Care · Functional Medicine · TCM";
  const line1 = content?.headlineLine1 ?? "Before the Baby,";
  const line2 = content?.headlineLine2 ?? "There Is You.";
  const subheading =
    content?.subheading ??
    "A whole-body, whole-partnership approach to preparing for one of the most profound experiences of your life. What you bring into conception shapes the world your child enters.";
  const primaryCta = content?.primaryCtaLabel ?? "Start the Journey";
  const secondaryCta = content?.secondaryCtaLabel ?? "The Approach";
  const credentials = content?.credentials ?? "Dr. Ashley Alden · DACM · L.Ac.";
  const footLabel = content?.footLabel ?? "Four lenses · one preparation";

  return (
    <section id="top" data-section="hero" className={styles.hero}>
      {/* Teal backdrop — sticky, never masked. Persists when photo fades. */}
      <div className={styles.tealShell} aria-hidden="true">
        <div className={styles.tealSticky}>
          <div className={styles.tealBg} />
        </div>
      </div>

      {/* Photo layer — sticky and masked. Fades during Balance scroll
          to reveal the teal beneath. */}
      <div className={styles.mediaShell} aria-hidden="true">
        <div className={styles.mediaSticky} data-hero-media>
          <div className={styles.media}>
            {images.map((img) => (
              <div
                key={img.key}
                className={`${styles.img} ${img.key === ACTIVE_IMAGE ? styles.imgActive : ""}`}
                style={{ backgroundImage: `url(${img.src})` }}
                {...(img.key === ACTIVE_IMAGE ? { "data-hero-primary": "" } : {})}
              />
            ))}
          </div>
          <div className={styles.noise} />
        </div>
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>

        <div className={styles.headlineRow}>
          <h1 className={styles.h1}>
            <span className={styles.line1}>{line1}</span>
            <em className={styles.line2}>
              {line2.includes("You.") ? (
                <>
                  {line2.replace("You.", "")}
                  <span className={styles.you}>You.</span>
                </>
              ) : (
                line2
              )}
            </em>
          </h1>

          <div className={styles.aside}>
            <p className={styles.sub}>{subheading}</p>

            <div className={styles.ctaRow}>
              <a href="#contact" className={`btn btn-primary ${styles.ctaBtn}`}>
                {primaryCta}
                <span className="btn-dot" />
              </a>
              <a href="#about" className={`btn btn-ghost-light ${styles.ctaBtn}`}>
                {secondaryCta}
                <span className="btn-dot" />
              </a>
            </div>

            <div className={styles.asideMeta}>
              <span>{credentials}</span>
              <span className={styles.rule} />
            </div>
          </div>
        </div>

        <div className={styles.foot}>
          <span className={styles.footLabel}>{footLabel}</span>

          <div className={styles.pillars}>
            {pillars.map((p) => (
              <span key={p.label} className={styles.pillar}>
                <svg viewBox="0 0 34 22" width="28" height="18" aria-hidden="true">
                  <g fill="currentColor">{p.bars}</g>
                </svg>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
