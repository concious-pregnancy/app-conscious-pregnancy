import styles from './Journal.module.css'

const articles = [
  {
    category: 'Gut Health',
    title: 'Why Your Microbiome Affects Everything — And What to Actually Do About It',
    date: 'March 2026',
    read: '8 min',
    shape: 'pill',
  },
  {
    category: 'Hormones',
    title: 'Perimenopause Is Not a Disease. Here\'s How to Work With It.',
    date: 'February 2026',
    read: '6 min',
    shape: 'circle',
  },
  {
    category: 'Psychedelic Integration',
    title: 'What Integration Actually Means — And Why Most People Skip It',
    date: 'January 2026',
    read: '10 min',
    shape: 'blob',
  },
]

const shapes: Record<string, string> = {
  pill: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  circle: 'circle(50%)',
  blob: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
}

export default function Journal() {
  return (
    <section id="journal" className={`section surface-off-white ${styles.journal}`}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className="section-label">Journal</p>
            <h2 className="section-title">
              Research and thinking<br />
              <em>worth reading.</em>
            </h2>
          </div>
          <a href="#" className={`btn btn-ghost ${styles.allLink}`}>
            View All Articles
          </a>
        </div>

        <div className={styles.grid}>
          {articles.map((a) => (
            <article key={a.title} className={styles.card}>
              <div
                className={styles.cardImage}
                style={{ clipPath: shapes[a.shape] }}
              />
              <div className={styles.cardBody}>
                <div className={styles.meta}>
                  <span className={styles.cat}>{a.category}</span>
                  <span className={styles.dot} />
                  <span className={styles.readTime}>{a.read} read</span>
                </div>
                <h3 className={styles.cardTitle}>{a.title}</h3>
                <p className={styles.date}>{a.date}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
