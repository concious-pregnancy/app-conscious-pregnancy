import styles from "./Journal.module.css";

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
          {articles.map((a) => (
            <article key={a.title} className={styles.card} data-stagger>
              <div className={styles.cardImageWrap}>
                <img src={a.image} alt="" className={styles.cardImage} loading="lazy" />
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
          ))}
        </div>
      </div>
    </section>
  );
}
