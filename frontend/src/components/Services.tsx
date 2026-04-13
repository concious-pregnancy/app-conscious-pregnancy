import styles from "./Services.module.css";

/* ── I Ching trigram SVGs ──────────────────────────────────────────────
   Each trigram is 3 horizontal lines. Solid = yang, broken = yin.
   The 8 trigrams map to service themes:
   ☰ Heaven (Qian)   – solid/solid/solid   → Functional & Eastern Medicine (wholeness)
   ☶ Mountain (Gen)   – solid/broken/broken → Somatic Healing (stillness)
   ☴ Wind   (Xun)     – solid/solid/broken  → Acupuncture (gentle penetration)
   ☲ Fire   (Li)      – solid/broken/solid  → CHI (clarity, illumination)
   ☵ Water  (Kan)     – broken/solid/broken → Lab Work (depth, uncovering)
   ☷ Earth  (Kun)     – broken/broken/broken → Nutritional Biochemistry (nourishment)
   ☳ Thunder (Zhen)   – broken/broken/solid → Supplementation (initiating force)
   ☱ Lake   (Tui)     – broken/solid/solid  → Lifestyle Strategies (joyful practice)
   ☰ Heaven (repeat)  – solid/solid/solid   → Community Resources (the whole)
──────────────────────────────────────────────────────────────────────── */

function Trigram({ lines }: { lines: [boolean, boolean, boolean] }) {
  const y = [20, 48, 76];
  return (
    <svg viewBox="0 0 100 100" className={styles.trigram} aria-hidden="true">
      {lines.map((solid, i) =>
        solid ? (
          <rect key={i} x="10" y={y[i]} width="80" height="8" rx="2" fill="currentColor" />
        ) : (
          <g key={i}>
            <rect x="10" y={y[i]} width="34" height="8" rx="2" fill="currentColor" />
            <rect x="56" y={y[i]} width="34" height="8" rx="2" fill="currentColor" />
          </g>
        ),
      )}
    </svg>
  );
}

const services = [
  {
    title: "Functional & Eastern Medicine",
    body: "Root-cause lab work meets TCM diagnostics. Understanding your unique biology before conception through both systems.",
    lines: [true, true, true] as [boolean, boolean, boolean],
  },
  {
    title: "Somatic Healing",
    body: "The nervous system you bring into pregnancy is the one your baby develops inside. Release what the body holds, build capacity to stay regulated.",
    lines: [true, false, false] as [boolean, boolean, boolean],
  },
  {
    title: "Acupuncture",
    body: "Hormonal regulation, fertility support, and whole-body balance. Three thousand years of clinical wisdom integrated into every in-person session.",
    lines: [true, true, false] as [boolean, boolean, boolean],
  },
  {
    title: "Pre-Conception Healing & Integration",
    body: "CHI: the identity shift of becoming a parent surfaces what has been buried. Address grief, inherited patterns, and unprocessed fear before pregnancy begins.",
    lines: [true, false, true] as [boolean, boolean, boolean],
  },
  {
    title: "Comprehensive Lab Work",
    body: "Advanced panels that go beyond standard prenatal screening: methylation markers, full thyroid, environmental toxins, and reproductive hormones for both partners.",
    lines: [false, true, false] as [boolean, boolean, boolean],
  },
  {
    title: "Nutritional Biochemistry",
    body: "Personalized nutrition built from your labs and physiology. Methylfolate over folic acid, adequate choline, DHA, and a food-first foundation for both partners.",
    lines: [false, false, false] as [boolean, boolean, boolean],
  },
  {
    title: "Medical-Grade Supplementation",
    body: "Evidence-backed protocols using third-party tested products. The right prenatal foundation plus targeted additions based on your individual labs.",
    lines: [false, false, true] as [boolean, boolean, boolean],
  },
  {
    title: "Functional Lifestyle",
    body: "Toxic load reduction, sleep optimization, movement by trimester, and circadian rhythm support. Practical changes, not anxiety-driven lists.",
    lines: [false, true, true] as [boolean, boolean, boolean],
  },
  {
    title: "Community & Birth Team",
    body: "Building your full care ecosystem: midwives, doulas, lactation consultants, pelvic floor PTs, and pediatricians aligned with your values.",
    lines: [true, true, true] as [boolean, boolean, boolean],
  },
];

export default function Services() {
  return (
    <section id="services" data-section="services" className={`${styles.services} noise-overlay`}>
      <div className={styles.grid}>
        {services.map((s) => (
          <a key={s.title} href="#contact" className={styles.card} data-stagger>
            <Trigram lines={s.lines} />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
              <span className={styles.readMore}>
                read more
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
