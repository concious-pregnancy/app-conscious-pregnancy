import styles from "./Listen.module.css";

export default function Listen() {
  return (
    <section id="listen" data-section="listen" className={styles.listen}>
      <div className={styles.stage}>
        <div className={styles.imageWrap} data-listen-wrap>
          <div
            className={styles.image}
            style={{ backgroundImage: "url('/hero/hero-water.jpeg')" }}
            aria-hidden="true"
          />
          <div className={styles.curve} aria-hidden="true">
            <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
              <path
                d="M 1180 60
                   C 1320 220, 1100 360, 980 460
                   S 880 680, 1080 760
                   C 1220 800, 1320 720, 1280 600
                   S 1080 460, 1000 360"
              />
            </svg>
          </div>
          <div className={styles.overlay}>
            <p className={styles.quote}>
              &ldquo;The body is always speaking. Learning to listen is where the deepest healing
              begins.&rdquo;
            </p>
            <p className={styles.attr}>
              Dr. Ashley Alden, DACM &middot; L.Ac. &middot; Founder of Conscious Pregnancy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
