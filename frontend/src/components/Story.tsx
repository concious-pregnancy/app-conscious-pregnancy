import styles from "./Story.module.css";

interface StoryProps {
  id?: string;
  label?: string;
  title: string;
  body: string;
  body2?: string;
  ctaLabel?: string;
  image: string;
  image2?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export default function Story({
  id = "stories",
  label = "A Different Starting Point.",
  title,
  body,
  body2,
  ctaLabel = "Read Full Story",
  image,
  image2,
  imageAlt = "Conscious Pregnancy client story",
  reverse = false,
}: StoryProps) {
  const backImage = image;
  const frontImage = image2 ?? "/hero/hero-kimono.jpeg";

  return (
    <section id={id} data-section="story" className={styles.story}>
      <div className={`${styles.inner} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{label}</p>
          <h2 className={styles.h2}>{title}</h2>
          <p className={styles.body}>{body}</p>
          {body2 && <p className={styles.body}>{body2}</p>}
          <a href="#contact" className={`btn ${styles.pill}`}>
            {ctaLabel}
            <span className="btn-dot" />
          </a>
        </div>

        <div className={styles.media} aria-hidden="true">
          <div
            className={`${styles.img} ${styles.back}`}
            style={{ backgroundImage: `url(${backImage})` }}
            role="img"
            aria-label={imageAlt}
          />
          <div
            className={`${styles.img} ${styles.front}`}
            style={{ backgroundImage: `url(${frontImage})` }}
            role="img"
            aria-label={`${imageAlt} detail`}
          />
        </div>
      </div>
    </section>
  );
}
