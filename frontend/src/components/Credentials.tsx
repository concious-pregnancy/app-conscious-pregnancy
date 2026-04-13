import styles from "./Credentials.module.css";

export default function Credentials() {
  return (
    <section data-section="credentials" className={`section ${styles.credentials}`}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left: image with overlay text */}
          <div className={styles.imageBlock}>
            <img
              src="/hero-pic.webp"
              alt="Dr. Ashley Alden in practice"
              className={styles.image}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <p className={styles.label}>Support grounded in experience</p>
              <h2 data-reveal className={styles.title}>
                <span className={styles.highlight}>Eastern and Western</span> medicine,{" "}
                <span className={styles.highlight}>one practice,</span> one purpose.
              </h2>
            </div>
          </div>

          {/* Right: body text */}
          <div className={styles.text}>
            <p data-reveal className={styles.body}>
              Dr. Ashley Alden holds a Doctorate in Acupuncture and Chinese Medicine (DACM) and a
              Master of Traditional Oriental Medicine (MTOM). She is a licensed acupuncturist
              (L.Ac.) with specialized training in functional medicine, somatic healing, and
              psychedelic integration for preconception and postpartum care.
            </p>
            <p data-reveal className={styles.body}>
              Her practice brings together functional lab analysis, acupuncture, nervous system
              regulation, and trauma-informed bodywork into a single, integrated model. The result
              is care that addresses root causes rather than isolated symptoms, preparing the whole
              person for conception, pregnancy, and beyond.
            </p>
            <a data-reveal href="#contact" className={`btn btn-ghost ${styles.cta}`}>
              <span className="btn-dot" />
              Learn More About Ashley
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
