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
        marginTop: 64,
        borderTop: "1px solid var(--border)",
        paddingTop: 20,
      }}
    >
      {children}
    </div>
  );
}

function ClassTag({ name }: { name: string }) {
  return (
    <code
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--sage-dark)",
        letterSpacing: "0.05em",
        background: "rgba(127,166,155,0.1)",
        padding: "3px 7px",
        border: "1px solid var(--sage-light)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      .{name}
    </code>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        color: "var(--muted)",
        lineHeight: 1.6,
        marginTop: 8,
        maxWidth: 360,
      }}
    >
      {children}
    </p>
  );
}

export default function ComponentsPage() {
  return (
    <div style={{ padding: "64px 64px 80px", maxWidth: 1280, margin: "0 auto" }}>
      {/* Buttons */}
      <SectionHead>Buttons</SectionHead>
      <div style={{ display: "flex", gap: 48, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ClassTag name="btn btn-primary" />
          <button className="btn btn-primary">
            <span className="btn-dot" />
            Begin your journey
          </button>
          <Note>
            Primary CTA. Sage fill, white text, pill radius. Hover lifts 1px and deepens to
            sage-dark.
          </Note>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ClassTag name="btn btn-ghost" />
          <button className="btn btn-ghost">
            <span className="btn-dot" />
            Learn more
          </button>
          <Note>
            Ghost button on light surface. Border softens to sage on hover, text shifts to
            sage-dark.
          </Note>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            background: "var(--dark)",
            padding: 24,
            borderRadius: "var(--radius-md)",
          }}
        >
          <ClassTag name="btn btn-ghost-light" />
          <button className="btn btn-ghost-light">
            <span className="btn-dot" />
            Read the philosophy
          </button>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.6,
              marginTop: 8,
              maxWidth: 320,
            }}
          >
            Ghost button on dark surface. White text, white-alpha border. Used inside surface-dark
            sections.
          </p>
        </div>
      </div>

      {/* Eyebrows */}
      <SectionHead>Eyebrows</SectionHead>
      <div style={{ display: "flex", gap: 64, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ClassTag name="t-label" />
          <span className="t-label">Prepping the palace</span>
          <Note>Inter 600 · 0.68rem · 0.22em · sage. Used above section titles.</Note>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ClassTag name="t-label t-label-eyebrow" />
          <span className="t-label t-label-eyebrow">Preconception care</span>
          <Note>
            Same scale, prefixed with a 40px hairline rule. Used as section openings on the
            homepage.
          </Note>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ClassTag name="section-label" />
          <span className="section-label">FUNCTIONAL MEDICINE · TCM · SOMATIC</span>
          <Note>Slightly smaller legacy variant kept for existing components.</Note>
        </div>
      </div>

      {/* Section pattern */}
      <SectionHead>Section opening pattern</SectionHead>
      <div style={{ maxWidth: 720, padding: "32px 0", borderTop: "1px solid var(--border)" }}>
        <span
          className="t-label t-label-eyebrow"
          style={{ marginBottom: 16, display: "inline-flex" }}
        >
          Eastern and Western medicine
        </span>
        <h2 className="section-title" style={{ marginTop: 16 }}>
          One practice, <em>one purpose.</em>
        </h2>
        <p className="section-body" style={{ marginTop: 16 }}>
          Functional lab analysis, acupuncture, nervous system regulation, and trauma-informed
          bodywork in a single integrated model. Care that addresses root causes rather than
          isolated symptoms.
        </p>
      </div>
      <Note>
        Anatomy: eyebrow label → serif title with italic accent → muted sans body capped at 52ch.
        Repeated across the homepage and the inner pages.
      </Note>

      {/* Surfaces */}
      <SectionHead>Surface helpers</SectionHead>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        <div className="surface-paper" style={{ padding: 32, borderRadius: "var(--radius-md)" }}>
          <ClassTag name="surface-paper" />
          <p style={{ marginTop: 12, fontFamily: "var(--font-sans)", fontSize: 13 }}>
            Warm cream paper · #f5f3ee. Editorial sections.
          </p>
        </div>
        <div
          className="surface-off-white"
          style={{ padding: 32, borderRadius: "var(--radius-md)" }}
        >
          <ClassTag name="surface-off-white" />
          <p style={{ marginTop: 12, fontFamily: "var(--font-sans)", fontSize: 13 }}>
            Off-white · #fafafa. Quiet alternates between white sections.
          </p>
        </div>
        <div
          className="surface-dark noise-overlay"
          style={{ padding: 32, borderRadius: "var(--radius-md)" }}
        >
          <ClassTag name="surface-dark noise-overlay" />
          <p
            style={{
              marginTop: 12,
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Deep neutral · #2e3231 with fractalNoise overlay at 3.5% opacity.
          </p>
        </div>
      </div>

      {/* Pull quote */}
      <SectionHead>Pull quote</SectionHead>
      <blockquote
        className="t-quote"
        style={{ maxWidth: 720, paddingLeft: 24, borderLeft: "2px solid var(--sage)" }}
      >
        The body is always speaking. Learning to listen is where the deepest healing begins.
      </blockquote>

      {/* Tokens reference */}
      <SectionHead>Motion tokens</SectionHead>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        <div>
          <strong style={{ color: "var(--dark)" }}>--ease-out</strong> · cubic-bezier(0.2, 0.7, 0.2,
          1)
        </div>
        <div>
          <strong style={{ color: "var(--dark)" }}>--ease-in-out</strong> · cubic-bezier(0.65, 0,
          0.35, 1)
        </div>
        <div>
          <strong style={{ color: "var(--dark)" }}>--dur-fast</strong> · 200ms
        </div>
        <div>
          <strong style={{ color: "var(--dark)" }}>--dur-mid</strong> · 350ms
        </div>
        <div>
          <strong style={{ color: "var(--dark)" }}>--dur-slow</strong> · 1100ms
        </div>
      </div>
    </div>
  );
}
