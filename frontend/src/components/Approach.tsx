import styles from './Approach.module.css'

const pillars = [
  {
    num: '01',
    title: 'Root Cause Thinking',
    body: 'Standard labs and ten-minute appointments miss the upstream drivers of chronic illness. Ashley runs a comprehensive picture: hormones, gut microbiome, environmental toxins, nervous system patterns, and nutritional biochemistry.',
  },
  {
    num: '02',
    title: 'Bio-Individuality',
    body: 'There is no universal protocol. Your genetics, history, environment, and goals shape every recommendation. What works for one person can harm another — understanding that difference is the work.',
  },
  {
    num: '03',
    title: 'Integrative Framework',
    body: 'Functional medicine, Eastern medicine, acupuncture, nutritional therapy, and psychedelic integration are tools in the same kit. The right one depends on where you are in your healing process.',
  },
]

export default function Approach() {
  return (
    <section id="approach" className={`section surface-off-white ${styles.approach}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-label">The Approach</p>
          <h2 className="section-title">
            Medicine built around<br />
            <em>who you actually are.</em>
          </h2>
          <p className="section-body">
            Ashley trained across functional medicine, traditional Chinese medicine,
            acupuncture, and psychedelic-informed therapy — not because each is the
            best tool, but because no single discipline has the full picture.
          </p>
        </div>

        <div className={styles.pillars}>
          {pillars.map((p) => (
            <div key={p.num} className={styles.pillar}>
              <span className={styles.num}>{p.num}</span>
              <h3 className={styles.pillarTitle}>{p.title}</h3>
              <p className={styles.pillarBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
