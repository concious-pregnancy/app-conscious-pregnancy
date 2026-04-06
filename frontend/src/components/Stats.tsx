import styles from "./Stats.module.css";

const stats = [
  { value: "90", label: "Days the preconception window spans" },
  { value: "50%", label: "Of fertility challenges trace to paternal factors" },
  { value: "74", label: "Days for sperm to fully mature" },
  { value: "60%", label: "Of people carry an MTHFR variant affecting folate metabolism" },
];

export default function Stats() {
  return (
    <section data-section="stats" className={styles.stats}>
      <div className="container">
        <p data-reveal className={styles.intro}>
          The biology of conception starts long before the positive test. These numbers explain why
          preconception preparation changes outcomes.
        </p>
        <div className={styles.grid}>
          {stats.map((s) => (
            <div key={s.label} className={styles.item} data-stagger>
              <span className={styles.value}>{s.value}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
