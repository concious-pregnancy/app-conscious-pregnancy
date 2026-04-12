import styles from "./Philosophy.module.css";

const modalities = [
  {
    num: "01",
    name: "Functional Medicine",
    desc: "Root-cause lab work at pregnancy-specific reference ranges.",
  },
  {
    num: "02",
    name: "Traditional Chinese Medicine",
    desc: "Acupuncture and herbal medicine to support hormonal balance.",
  },
  {
    num: "03",
    name: "Somatic Healing",
    desc: "Nervous system regulation for conception and birth readiness.",
  },
  {
    num: "04",
    name: "Psychedelic Integration",
    desc: "Processing unresolved material before the great transition.",
  },
];

export default function Philosophy() {
  return (
    <section data-section="philosophy" className={`section ${styles.philosophy}`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <p data-reveal className={styles.label}>
            Prepping the Palace
          </p>
          <h2 data-reveal className={styles.heading}>
            These are not separate modalities stitched together. They are four lenses on the same
            truth: your whole self, physical, energetic, and emotional, shapes the life you are
            about to create.
          </h2>
          <a data-reveal href="#process" className={`btn btn-ghost ${styles.cta}`}>
            <span className="btn-dot" />
            How We Work Together
          </a>
        </div>

        <ul className={styles.right} aria-label="The four modalities">
          {modalities.map((m) => (
            <li key={m.num} data-stagger className={styles.modality}>
              <span className={styles.modalityNum}>{m.num}</span>
              <div>
                <p className={styles.modalityName}>{m.name}</p>
                <p className={styles.modalityDesc}>{m.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
