import styles from "./RealStories.module.css";

export default function RealStories() {
  return (
    <section id="story" data-section="real-stories" className={styles.story}>
      <div className={styles.stage}>
        <div className={styles.inner}>
          <div className={styles.copy} data-real-stories-copy>
            <p className={styles.eyebrow}>Real Stories.</p>
            <h2 className={styles.h2} data-real-stories-h2>
              She came in thinking her hormones were fine.
            </h2>
            <p className={styles.body} data-real-stories-body>
              Standard bloodwork had flagged nothing. A full functional panel told a different
              story. Subclinical hypothyroidism, low vitamin D, an MTHFR variant she had never heard
              of. Three months later her numbers and her energy had both shifted.
            </p>
            <a href="#contact" className={`btn ${styles.pill}`} data-real-stories-pill>
              Read the full story
              <span className="btn-dot" />
            </a>
          </div>
          <div className={styles.media} aria-hidden="true">
            <div className={`${styles.img} ${styles.back}`} />
            <div className={`${styles.img} ${styles.front}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
