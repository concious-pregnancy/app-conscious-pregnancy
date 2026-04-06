import styles from './Credentials.module.css'

const creds = [
  { label: 'Doctor of Acupuncture', detail: 'DACM' },
  { label: 'Master of Traditional Oriental Medicine', detail: 'MTOM' },
  { label: 'Licensed Acupuncturist', detail: 'L.Ac.' },
  { label: 'Functional Medicine', detail: 'Preconception Specialist' },
  { label: 'Somatic Healing', detail: 'Trauma-Informed Practice' },
  { label: 'Psychedelic Integration', detail: 'Preconception + Postpartum' },
]

export default function Credentials() {
  return (
    <section data-section="credentials" className={`section ${styles.credentials}`}>
      <div className="container">
        <p data-reveal className={styles.heading}>
          Dr. Ashley Alden brings Eastern and Western medicine together
          in a single practice: functional labs, acupuncture, somatic healing,
          and integration work, all oriented toward the same goal.
        </p>
        <div className={styles.grid}>
          {creds.map((c) => (
            <div key={c.label} className={styles.card} data-stagger>
              <span className={styles.cardLabel}>{c.label}</span>
              <span className={styles.cardDetail}>{c.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
