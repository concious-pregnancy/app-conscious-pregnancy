import styles from "./Story.module.css";

interface StoryProps {
  label?: string;
  title: string;
  body: string;
  image: string;
  image2?: string;
  imageAlt?: string;
  reverse?: boolean;
}

export default function Story({
  label = "Real stories.",
  title,
  body,
  image,
  image2,
  imageAlt = "Conscious Pregnancy client story",
  reverse = false,
}: StoryProps) {
  const secondImage = image2 ?? image;

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

        <div className={styles.imageStack}>
          {/* Back image (larger) */}
          <div className={styles.imageWrapBack} data-parallax-speed="0.1">
            <img
              src={image}
              alt={imageAlt}
              className={styles.image}
              loading="lazy"
              data-zoom-scroll
            />
          </div>
          {/* Front image (smaller, offset) */}
          <div className={styles.imageWrapFront} data-parallax-speed="0.18">
            <img
              src={secondImage}
              alt={`${imageAlt} detail`}
              className={styles.image}
              loading="lazy"
              data-zoom-scroll
            />
          </div>
        </div>
      </div>
    </section>
  );
}
