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
    <>
      <section id="process" data-section="process-intro" className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introLeft}>
            <p className={styles.introEyebrow}>Process</p>
            <h2 className={styles.introDisplay}>
              How <em>It Works</em>
            </h2>
            <div className={styles.introRule} />
          </div>
          <p className={styles.introLede}>
            Getting started doesn&rsquo;t have to be complicated. Our process is simple, supportive,
            and designed to move at a pace that feels right for you, from the first conversation to
            the changes you&rsquo;ll see over time.
          </p>
        </div>
      </section>

      <div className={styles.track} data-section="process" data-step-count={steps.length}>
        <div className={styles.stage}>
          <div className={styles.curve} aria-hidden="true">
            <svg viewBox="0 0 1200 1000" preserveAspectRatio="none">
              <path
                data-process-curve
                d="M 900 0
                   C 400 200, 1100 380, 500 520
                   S 200 720, 800 860
                   C 1100 960, 300 1000, 600 1000"
              />
            </svg>
          </div>

          {steps.map((s, i) => (
            <div
              key={s.num}
              className={styles.slide}
              data-process-slide
              data-is-active={i === 0 ? "true" : "false"}
              data-is-exiting="false"
              data-step={i}
            >
              <div className={styles.text}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
              <div className={styles.num}>{s.num}</div>
            </div>
          ))}

          <div className={styles.progress} data-process-progress>
            {steps.map((s, i) => (
              <span key={s.num} data-is-on={i === 0 ? "true" : "false"} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
