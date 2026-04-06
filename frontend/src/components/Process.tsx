import styles from './Process.module.css'

const steps = [
  {
    num: '01',
    title: 'Discovery Call',
    body: 'A 20-minute conversation to understand what you\'re dealing with and whether working together makes sense. No obligation, no pitch.',
  },
  {
    num: '02',
    title: 'Comprehensive Intake',
    body: 'A 90-minute deep dive into your health history, symptoms, lifestyle, environment, and goals. This is where conventional medicine usually cuts things short.',
  },
  {
    num: '03',
    title: 'Advanced Testing',
    body: 'Targeted lab work based on what emerged in the intake — not a standard panel. Microbiome, hormones, toxins, genetics, and metabolic markers as needed.',
  },
  {
    num: '04',
    title: 'Personalized Protocol',
    body: 'A written plan: nutrition, supplements (quality-sourced and dosed precisely), lifestyle changes, and any referrals or additional modalities.',
  },
  {
    num: '05',
    title: 'Ongoing Support',
    body: 'Regular follow-ups to track response, adjust the protocol, and work through what comes up. Healing is not linear — the support shouldn\'t be either.',
  },
]

export default function Process() {
  return (
    <section id="process" className={`section ${styles.process}`}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.left}>
            <p className="section-label">How It Works</p>
            <h2 className="section-title">
              A process as<br />
              <em>thorough as you need.</em>
            </h2>
            <p className="section-body" style={{ marginBottom: '2.5rem' }}>
              The intake alone takes longer than most doctors spend with a patient
              in an entire year. That is by design.
            </p>
            <a href="#contact" className="btn btn-primary">
              <span className="btn-dot" />
              Start with a Discovery Call
            </a>
          </div>

          <div className={styles.steps}>
            {steps.map((s, i) => (
              <div key={s.num} className={styles.step}>
                <div className={styles.stepNum}>{s.num}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
                {i < steps.length - 1 && <div className={styles.connector} />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
