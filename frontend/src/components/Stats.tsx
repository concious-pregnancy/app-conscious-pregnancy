import styles from "./Stats.module.css";

type StatItem = { value: string; label: string };

type StatsContent = {
  intro?: string;
  stats?: StatItem[];
} | null;

const defaultStats: StatItem[] = [
  { value: "90", label: "Days the preconception window spans" },
  { value: "50%", label: "Of fertility challenges trace to paternal factors" },
  { value: "74", label: "Days for sperm to fully mature" },
  { value: "60%", label: "Of people carry an MTHFR variant affecting folate metabolism" },
];

export default function Stats({ content }: { content?: StatsContent }) {
  const intro =
    content?.intro ??
    "The biology of conception starts long before the positive test. These numbers explain why preconception preparation changes outcomes.";
  const stats = content?.stats?.length ? content.stats : defaultStats;

  return (
    <section data-section="stats" className={styles.stats}>
      <div className="container">
        <p data-reveal className={styles.intro}>
          {intro}
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
