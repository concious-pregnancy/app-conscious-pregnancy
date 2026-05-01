import styles from "./Hero.module.css";

const images = [
  { key: "leaves", src: "/hero/hero-leaves.jpeg" },
  { key: "water", src: "/hero/hero-water.jpeg" },
  { key: "eye", src: "/hero/hero-eye.jpeg" },
  { key: "flame", src: "/hero/hero-flame.jpeg" },
  { key: "kimono", src: "/hero/hero-kimono.jpeg" },
] as const;

const ACTIVE_IMAGE = "kimono";

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

export default function Hero() {
  return (
    <section id="top" data-section="hero" className={styles.hero}>
      <div className={styles.media} aria-hidden="true">
        {images.map((img) => (
          <div
            key={img.key}
            className={`${styles.img} ${img.key === ACTIVE_IMAGE ? styles.imgActive : ""}`}
            style={{ backgroundImage: `url(${img.src})` }}
            {...(img.key === ACTIVE_IMAGE ? { "data-hero-primary": "" } : {})}
          />
        ))}
      </div>

      <div className={styles.noise} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.eyebrow}>Preconception Care · Functional Medicine · TCM</p>

        <div className={styles.headlineRow}>
          <h1 className={styles.h1}>
            <span className={styles.line1}>Before the Baby,</span>
            <em className={styles.line2}>
              There Is <span className={styles.you}>You.</span>
            </em>
          </h1>

          <div className={styles.aside}>
            <p className={styles.sub}>
              A whole-body, whole-partnership approach to preparing for one of the most profound
              experiences of your life. What you bring into conception shapes the world your child
              enters.
            </p>

            <div className={styles.ctaRow}>
              <a href="#contact" className={`btn btn-primary ${styles.ctaBtn}`}>
                Start the Journey
                <span className="btn-dot" />
              </a>
              <a href="#about" className={`btn btn-ghost-light ${styles.ctaBtn}`}>
                The Approach
                <span className="btn-dot" />
              </a>
            </div>

            <div className={styles.asideMeta}>
              <span>Dr.&nbsp;Ashley&nbsp;Alden · DACM · L.Ac.</span>
              <span className={styles.rule} />
            </div>
          </div>
        </div>

        <div className={styles.foot}>
          <span className={styles.footLabel}>Four lenses · one preparation</span>

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
