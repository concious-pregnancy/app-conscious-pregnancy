type Role = {
  label: string;
  className?: string;
  style?: React.CSSProperties;
  sample: React.ReactNode;
  spec: string;
};

const serifRoles: Role[] = [
  {
    label: "Display",
    className: "t-display",
    sample: (
      <>
        Before the baby, <em>there is you.</em>
      </>
    ),
    spec: "Crimson Text · 400 · clamp(3.4rem, 8.4vw, 8.4rem) / 0.94 · -0.035em",
  },
  {
    label: "Section H1",
    className: "t-h1",
    sample: (
      <>
        A <em>whole-body</em> approach to preconception.
      </>
    ),
    spec: "Crimson Text · 400 · clamp(2.75rem, 6vw, 5rem) / 1.05 · -0.04em",
  },
  {
    label: "Section title",
    className: "section-title",
    sample: (
      <>
        Eastern and <em>Western</em> medicine, one practice.
      </>
    ),
    spec: "Crimson Text · 400 · clamp(2.75rem, 6vw, 5rem) / 1.05 · -0.04em",
  },
  {
    label: "H3 / card title",
    className: "t-h3",
    sample: "Prepping the palace before a new life takes residence.",
    spec: "Crimson Text · 400 · 1.6rem / 1.18 · -0.02em",
  },
  {
    label: "Pull quote",
    className: "t-quote",
    sample: "The body is always speaking. Learning to listen is where the deepest healing begins.",
    spec: "Crimson Text · italic · clamp(1.6rem, 3vw, 2.2rem) / 1.4",
  },
  {
    label: "Display sage",
    className: "display-sage",
    style: { fontSize: "clamp(3rem, 6vw, 5rem)" },
    sample: "01.",
    spec: "Crimson Text · 400 · clamp(5rem, 12vw, 9.5rem) / 1 · -0.05em · sage",
  },
  {
    label: "Logo wordmark",
    className: "t-logo",
    sample: "conscious—pregnancy",
    spec: "Crimson Text · 400 · 1.35rem · 0",
  },
];

const sansRoles: Role[] = [
  {
    label: "Sans heading (H2)",
    className: "t-h2",
    sample: "How we work together.",
    spec: "Inter · 500 · clamp(2rem, 4vw, 2.75rem) / 1.15 · -0.04em",
  },
  {
    label: "Section title sans",
    className: "section-title-sans",
    sample: "Support starts with a single conversation.",
    spec: "Inter · 500 · clamp(2rem, 4vw, 3rem) / 1.15 · -0.04em",
  },
  {
    label: "Body",
    className: "t-body",
    sample:
      "Real food first. Methylfolate, choline, DHA. Look at the maternal microbiome before reaching for antibiotics. Match the pace of care to the pace of the body.",
    spec: "Inter · 400 · 1rem / 1.7 · muted",
  },
  {
    label: "Body small",
    className: "t-body-sm",
    sample: "Used for captions, byline metadata, and dense supporting copy.",
    spec: "Inter · 400 · 0.875rem / 1.55 · muted",
  },
  {
    label: "Section body",
    className: "section-body",
    sample:
      "Sessions are an hour, not fifteen minutes. Nervous system regulation is part of the protocol, not an extra. Care is built around bio-individuality, not population averages.",
    spec: "Inter · 400 · 1rem / 1.7 · muted · 52ch",
  },
  {
    label: "Eyebrow / label",
    className: "t-label",
    sample: "PREPPING THE PALACE",
    spec: "Inter · 600 · 0.68rem · 0.22em · uppercase · sage",
  },
  {
    label: "Label with eyebrow rule",
    className: "t-label t-label-eyebrow",
    sample: "PRECONCEPTION CARE",
    spec: "Inter · 600 · 0.68rem · 0.22em · with 40px hairline rule",
  },
  {
    label: "Section label (legacy)",
    className: "section-label",
    sample: "FUNCTIONAL MEDICINE · TCM · SOMATIC",
    spec: "Inter · 600 · 0.63rem · 0.22em · uppercase · sage",
  },
  {
    label: "Italic accent · sage",
    className: "t-italic-sage",
    style: { fontFamily: "var(--font-serif)", fontSize: "1.6rem" },
    sample: "before reaching for the prescription pad.",
    spec: "Crimson Text · italic · sage",
  },
  {
    label: "Italic accent · gold",
    className: "t-italic-gold",
    style: { fontFamily: "var(--font-serif)", fontSize: "1.6rem" },
    sample: "the warm thread that runs through the practice.",
    spec: "Crimson Text · italic · gold",
  },
];

function TypeRow({ role }: { role: Role }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr 280px",
        gap: 32,
        alignItems: "start",
        borderTop: "1px solid var(--border)",
        paddingTop: 24,
        paddingBottom: 24,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--muted)",
          paddingTop: 6,
        }}
      >
        {role.label}
      </div>
      <div className={role.className} style={role.style}>
        {role.sample}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--muted)",
          lineHeight: 1.7,
          paddingTop: 6,
        }}
      >
        {role.spec}
      </div>
    </div>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 24,
        marginTop: 56,
      }}
    >
      {children}
    </div>
  );
}

export default function TypePage() {
  return (
    <div style={{ padding: "64px 64px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionHead>Crimson Text · display, headings, italic accents</SectionHead>
      {serifRoles.map((r) => (
        <TypeRow key={r.label} role={r} />
      ))}

      <SectionHead>Inter · sans body, eyebrows, UI chrome</SectionHead>
      {sansRoles.map((r) => (
        <TypeRow key={r.label} role={r} />
      ))}
    </div>
  );
}
