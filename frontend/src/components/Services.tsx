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
    trigram: "☵",
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
    trigram: "☰",
  },
  {
    title: "Somatic Healing Therapy",
    body: "The body holds memory. Stress, trauma, and unprocessed emotion live in the tissues, and they can shape the environment your baby develops in.",
    image: "/hero/hero-eye.jpeg",
    trigram: "☷",
  },
  {
    title: "Psychedelic Integration",
    body: "For those ready to go deeper, psychedelic integration offers a pathway to profound clearing of patterns, beliefs, and emotional or ancestral material.",
    image: "/hero/hero-leaves.jpeg",
    trigram: "☲",
  },
];

const extras = [
  {
    trigram: "☶",
    title: "Comprehensive Lab Work",
    body: "Advanced panels that go beyond standard bloodwork: methylation, full thyroid, toxin burden, and reproductive hormones for both partners.",
  },
  {
    trigram: "☴",
    title: "Nutritional Biochemistry",
    body: "A personalized nutrition plan built around your labs and physiology, not a one-size protocol. From preconception through postpartum.",
  },
  {
    trigram: "☱",
    title: "Medical-Grade Supplementation",
    body: "Evidence-backed protocols, third-party tested, specific to your biology. You will understand why every piece is in your plan.",
  },
  {
    trigram: "☳",
    title: "Functional Lifestyle Strategies",
    body: "Sleep, toxic load reduction, movement, and circadian rhythm — the daily rhythms that make everything else in your care plan more effective.",
  },
  {
    trigram: "☷",
    title: "Community Resources",
    body: "Your full care ecosystem, built with intention: midwives, doulas, lactation, pelvic floor PT, and pediatric referrals aligned with your values.",
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
                  <span className={styles.trigram}>{s.trigram}</span>
                  <a href="#contact">Read More</a>
                </div>
              </div>
            </article>
            <p className={styles.body}>{s.body}</p>
          </div>
        ))}
      </div>

      <div className={styles.strip}>
        {extras.map((e) => (
          <div key={e.title} className={styles.stripItem}>
            <span className={styles.stripTrigram}>{e.trigram}</span>
            <h4 className={styles.stripTitle}>{e.title}</h4>
            <p className={styles.stripBody}>{e.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
