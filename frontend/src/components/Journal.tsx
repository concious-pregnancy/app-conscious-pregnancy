import styles from "./Journal.module.css";

const blobs = [
  {
    viewBox: "0 0 314 211",
    path: "M169.086 208.356C58.174 226.813-56.084 146.002 30.446 47.732s165.89-17.958 249.552 4.49c83.662 22.447 0 137.678-110.912 156.134Z",
  },
  {
    viewBox: "0 0 297 222",
    path: "M13.013 89.829c-52.508 167.719 66.63 135.575 130.863 116.16 64.233-19.415 187.688-14.692 143.955-97.6C244.098 25.482 65.521-77.89 13.013 89.829Z",
  },
  {
    viewBox: "0 0 314 236",
    path: "M299.371 37.497c71.678 93.882-140.257 275.01-199.025 163.175C41.578 88.837-21.431 89.682 7.074 47.254c28.505-42.427 241.57-76.198 292.297-9.757Z",
  },
];

const articles = [
  {
    title: "Methylfolate vs. Folic Acid: Why the Difference Matters.",
    excerpt:
      "Up to 60% of people carry an MTHFR variant that limits their ability to convert synthetic folic acid into the active form the body can use. Here is what to take instead and why.",
    image: "/hero-pic.webp",
  },
  {
    title: "Your Microbiome Shapes Your Baby's Immune System.",
    excerpt:
      "The bacteria colonizing your gut and birth canal are the first organisms your baby encounters. What the research shows about maternal microbiome and infant health outcomes.",
    image: "/hero-pic.webp",
  },
  {
    title: "The 90-Day Window: Why Preconception Prep Starts Now.",
    excerpt:
      "Sperm take 74 days to mature. Egg quality is influenced by the environment it develops in months before ovulation. The foundation of your child's health is built before the pregnancy test.",
    image: "/hero-pic.webp",
  },
];

export default function Journal() {
  return (
    <section id="journal" data-section="journal" className={`section ${styles.journal}`}>
      <div className="container">
        <div className={styles.header}>
          <p data-reveal className="section-label">
            Journal
          </p>
          <h2 data-reveal className={styles.title}>
            Evidence, not
            <br />
            <em>opinion.</em>
          </h2>
        </div>

        <div className={styles.grid}>
          {articles.map((a, i) => {
            const blob = blobs[i % blobs.length];
            const clipId = `blob-${i}`;
            return (
              <article key={a.title} className={styles.card} data-stagger>
                <div className={styles.cardImageWrap}>
                  {/* Decorative outline blob */}
                  <svg
                    className={styles.blobOutline}
                    viewBox={blob.viewBox}
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d={blob.path} stroke="var(--sage)" strokeWidth="1" opacity="0.21" />
                  </svg>
                  {/* Clip path definition */}
                  <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
                    <defs>
                      <clipPath id={clipId} clipPathUnits="objectBoundingBox">
                        <path
                          d={blob.path}
                          transform={`scale(${1 / parseFloat(blob.viewBox.split(" ")[2])}, ${1 / parseFloat(blob.viewBox.split(" ")[3])})`}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <img
                    src={a.image}
                    alt=""
                    className={styles.cardImage}
                    loading="lazy"
                    style={{ clipPath: `url(#${clipId})` }}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{a.title}</h3>
                  <p className={styles.excerpt}>{a.excerpt}</p>
                  <a href="#" className={styles.readMore}>
                    Read Article
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
