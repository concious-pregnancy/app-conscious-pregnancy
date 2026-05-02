import styles from "./RealStories.module.css";

type Testimonial = {
  _id: string;
  eyebrow?: string;
  heading: string;
  body?: string;
  ctaLabel?: string;
};

export default function RealStories({ testimonial }: { testimonial: Testimonial | null }) {
  const eyebrow = testimonial?.eyebrow ?? "Real Stories.";
  const heading = testimonial?.heading ?? "She came in thinking her hormones were fine.";
  const body =
    testimonial?.body ??
    "Standard bloodwork had flagged nothing. A full functional panel told a different story. Subclinical hypothyroidism, low vitamin D, an MTHFR variant she had never heard of. Three months later her numbers and her energy had both shifted.";
  const ctaLabel = testimonial?.ctaLabel ?? "Read the full story";

  return (
    <section id="story" data-section="real-stories" className={styles.story}>
      <div className={styles.stage}>
        <div className={styles.inner}>
          <div className={styles.copy} data-real-stories-copy>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h2 className={styles.h2} data-real-stories-h2>
              {heading}
            </h2>
            <p className={styles.body} data-real-stories-body>
              {body}
            </p>
            <a href="#contact" className={`btn ${styles.pill}`} data-real-stories-pill>
              {ctaLabel}
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
