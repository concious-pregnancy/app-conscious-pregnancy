import styles from "./Story.module.css";

interface StoryProps {
  label?: string;
  title: string;
  body: string;
  image: string;
  imageAlt?: string;
  reverse?: boolean;
}

export default function Story({
  label = "Real stories.",
  title,
  body,
  image,
  imageAlt = "Conscious Pregnancy client story",
  reverse = false,
}: StoryProps) {
  return (
    <section id="stories" data-section="story" className={`section ${styles.story}`}>
      <div className={`container ${styles.layout} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.text}>
          <p data-reveal className={styles.label}>
            {label}
          </p>
          <h2 data-reveal className={styles.title}>
            {title}
          </h2>
          <p data-reveal className={styles.body}>
            {body}
          </p>
          <a data-reveal href="#contact" className={`btn btn-ghost ${styles.cta}`}>
            <span className="btn-dot" />
            Read Full Story
          </a>
        </div>
        <div className={styles.imageWrap} data-reveal>
          <img src={image} alt={imageAlt} className={styles.image} loading="lazy" />
        </div>
      </div>
    </section>
  );
}
