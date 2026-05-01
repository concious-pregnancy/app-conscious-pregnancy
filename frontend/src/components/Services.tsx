import styles from "./Services.module.css";

const services = [
  {
    title: (
      <>
        Functional Medicine
        <br />+ Western Labs
      </>
    ),
    body: "Comprehensive functional lab work: hormones at pregnancy-specific reference ranges, micronutrient status, toxin burden, immune function, gut health, and genetic markers.",
    image: "/hero/hero-water.jpeg",
  },
  {
    title: (
      <>
        Traditional Chinese Medicine
        <br />+ Acupuncture
      </>
    ),
    body: "TCM has mapped the body's energetic landscape for thousands of years. We use this wisdom to identify where energy is blocked, depleted, or out of balance.",
    image: "/hero/hero-flame.jpeg",
  },
  {
    title: "Somatic Healing Therapy",
    body: "The body holds memory. Stress, trauma, and unprocessed emotion live in the tissues, and they can shape the environment your baby develops in.",
    image: "/hero/hero-eye.jpeg",
  },
  {
    title: "Psychedelic Integration",
    body: "For those ready to go deeper, psychedelic integration offers a pathway to profound clearing of patterns, beliefs, and emotional or ancestral material.",
    image: "/hero/hero-leaves.jpeg",
  },
];

export default function Services() {
  return (
    <section id="services" data-section="services" className={styles.services}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>The Work</p>
          <h2 className={styles.h2}>
            Four lenses on <em>one preparation.</em>
          </h2>
        </div>
        <div className={styles.headRight}>
          <p>
            Each practice stands on its own. Together, they meet you at every layer, cellular,
            energetic, emotional, in the window before you conceive.
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <div key={i} className={styles.col} data-stagger>
            <article className={styles.card} style={{ backgroundImage: `url(${s.image})` }}>
              <div className={styles.cardInner}>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <div className={styles.cardFoot}>
                  <span className={styles.trigram}>☰</span>
                  <a href="#contact">Read More</a>
                </div>
              </div>
            </article>
            <p className={styles.body}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
