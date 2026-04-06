import styles from "./CTA.module.css";

const images = [
  "/hero-pic.webp",
  "/hero-pic.webp",
  "/hero-pic.webp",
  "/hero-pic.webp",
  "/hero-pic.webp",
];

export default function CTA() {
  return (
    <section data-section="cta" className={styles.cta}>
      <div className="container">
        <h2 data-reveal className={styles.heading}>
          Ready to prepare
          <br />
          <em>with intention?</em>
        </h2>
        <div className={styles.row} data-stagger>
          {images.map((src, i) => (
            <div key={i} className={styles.thumb}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <a data-reveal href="#contact" className={`btn btn-primary ${styles.btn}`}>
          <span className="btn-dot" />
          Start Your Journey
        </a>
      </div>
    </section>
  );
}
