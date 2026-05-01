import styles from "./Process.module.css";

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    body: "We start with a conversation: where you are, what you want to optimize, and whether this program is the right fit. No pressure, no commitment. Just an honest look at what is possible.",
  },
  {
    num: "02",
    title: "Functional Assessment",
    body: "Comprehensive lab work at pregnancy-specific reference ranges. Hormones, micronutrients, gut health, immune function, genetic markers. We map your unique biology before building your protocol.",
  },
  {
    num: "03",
    title: "Personalized Protocol",
    body: "Your 90-day preconception plan is built around your labs, your history, and your goals. Acupuncture, somatic work, nutritional guidance, and integration support woven together as a single program.",
  },
  {
    num: "04",
    title: "Ongoing Support",
    body: "Regular check-ins, protocol adjustments, and continued TCM care through the full preconception window and into early pregnancy. We stay with you through the whole arc.",
  },
];

export default function Process() {
  return (
    <section id="process" data-section="process" className={styles.process}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <h2 data-reveal className={styles.label}>
            How It Works
          </h2>
          <p data-reveal className={styles.intro}>
            The 90-day preconception window is not a countdown. It is the most meaningful
            investment you can make before conception.
          </p>
        </div>

        <div className={styles.track}>
          {steps.map((s) => (
            <div key={s.num} className={styles.step} data-reveal>
              <span className={styles.stepNum}>{s.num}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
