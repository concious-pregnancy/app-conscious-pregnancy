import styles from "./Process.module.css";

type ProcessStep = { title: string; body: string };

type ProcessContent = {
  lede?: string;
  steps?: ProcessStep[];
} | null;

const defaultSteps: ProcessStep[] = [
  {
    title: "Discovery Call",
    body: "We start with a conversation: where you are, what you want to optimize, and whether this program is the right fit. No pressure, no commitment. Just an honest look at what is possible.",
  },
  {
    title: "Functional Assessment",
    body: "Comprehensive lab work at pregnancy-specific reference ranges. Hormones, micronutrients, gut health, immune function, genetic markers. We map your unique biology before building your protocol.",
  },
  {
    title: "Personalized Protocol",
    body: "Your 90-day preconception plan is built around your labs, your history, and your goals. Acupuncture, somatic work, nutritional guidance, and integration support woven together as a single program.",
  },
  {
    title: "Ongoing Support",
    body: "Regular check-ins, protocol adjustments, and continued TCM care through the full preconception window and into early pregnancy. We stay with you through the whole arc.",
  },
];

export default function Process({ content }: { content?: ProcessContent }) {
  const lede =
    content?.lede ??
    "Getting started doesn’t have to be complicated. Our process is simple, supportive, and designed to move at a pace that feels right for you, from the first conversation to the changes you’ll see over time.";
  const steps = content?.steps?.length ? content.steps : defaultSteps;

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
          <p className={styles.introLede}>{lede}</p>
        </div>
      </section>

      <div className={styles.track} data-section="process">
        <div className={styles.inner}>
          <div className={styles.steps}>
            {steps.map((s, i) => (
              <div key={i} className={styles.step} data-process-step={i}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.numPanel}>
            <div className={styles.numContent}>
              <span className={styles.numZero}>0</span>
              <div className={styles.numSlot}>
                {steps.map((s, i) => (
                  <span key={i} className={styles.numDigit} data-process-digit={i}>
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.progress} data-process-progress>
              {steps.map((s, i) => (
                <span key={i} data-is-on={i === 0 ? "true" : "false"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
