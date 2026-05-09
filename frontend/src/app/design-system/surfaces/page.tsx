type SpaceRow = { token: string; px: string };
type RadiusRow = { token: string; value: string };
type ShadowRow = { token: string; value: string };

const spacingPx: SpaceRow[] = [
  { token: "--s-1", px: "4px" },
  { token: "--s-2", px: "8px" },
  { token: "--s-3", px: "12px" },
  { token: "--s-4", px: "16px" },
  { token: "--s-6", px: "24px" },
  { token: "--s-8", px: "32px" },
  { token: "--s-12", px: "48px" },
  { token: "--s-16", px: "64px" },
  { token: "--s-24", px: "96px" },
  { token: "--s-32", px: "128px" },
];

const spacingRem: SpaceRow[] = [
  { token: "--s1", px: "0.5rem · 8px" },
  { token: "--s2", px: "1rem · 16px" },
  { token: "--s3", px: "1.5rem · 24px" },
  { token: "--s4", px: "2rem · 32px" },
  { token: "--s6", px: "3rem · 48px" },
  { token: "--s8", px: "4rem · 64px" },
  { token: "--s12", px: "6rem · 96px" },
  { token: "--s16", px: "8rem · 128px" },
];

const radii: RadiusRow[] = [
  { token: "--radius-sm", value: "4px" },
  { token: "--radius-md", value: "8px" },
  { token: "--radius-lg", value: "12px" },
  { token: "--radius-xl", value: "20px" },
  { token: "--radius-pill", value: "999px" },
];

const shadows: ShadowRow[] = [
  { token: "--shadow-sm", value: "0 1px 2px rgba(46, 50, 49, 0.06)" },
  { token: "--shadow-md", value: "0 8px 24px -10px rgba(46, 50, 49, 0.12)" },
  { token: "--shadow-lg", value: "0 20px 50px -20px rgba(46, 50, 49, 0.15)" },
  { token: "--shadow-xl", value: "0 30px 80px -30px rgba(46, 50, 49, 0.25)" },
];

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

export default function SurfacesPage() {
  return (
    <div style={{ padding: "64px 64px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <SectionHead>Layout tokens</SectionHead>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
        }}
      >
        <strong style={{ color: "var(--dark)" }}>--max-w</strong>
        <span style={{ color: "var(--muted)" }}>1400px · container max width</span>
        <strong style={{ color: "var(--dark)" }}>--pad-x</strong>
        <span style={{ color: "var(--muted)" }}>
          clamp(24px, 5vw, 80px) · container side padding
        </span>
        <strong style={{ color: "var(--dark)" }}>--nav-h</strong>
        <span style={{ color: "var(--muted)" }}>84px · fixed nav height</span>
      </div>

      <SectionHead>Spacing · 4px base scale</SectionHead>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {spacingPx.map((row) => (
          <div
            key={row.token}
            style={{
              display: "grid",
              gridTemplateColumns: "120px 100px 1fr",
              gap: 16,
              alignItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--muted)",
            }}
          >
            <span style={{ color: "var(--dark)" }}>{row.token}</span>
            <span>{row.px}</span>
            <span
              aria-hidden="true"
              style={{ height: 12, background: "var(--sage-light)", width: row.px }}
            />
          </div>
        ))}
      </div>

      <SectionHead>Spacing, legacy rem scale</SectionHead>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: 12,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        {spacingRem.flatMap((row) => [
          <span key={`${row.token}-k`} style={{ color: "var(--dark)" }}>
            {row.token}
          </span>,
          <span key={`${row.token}-v`}>{row.px}</span>,
        ])}
      </div>

      <SectionHead>Radii</SectionHead>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {radii.map((r) => (
          <div
            key={r.token}
            style={{
              width: 140,
              display: "flex",
              flexDirection: "column",
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                background: "var(--sage-light)",
                borderRadius: `var(${r.token})`,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--dark)",
              }}
            >
              {r.token}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--muted)",
              }}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>

      <SectionHead>Elevation</SectionHead>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 32,
          padding: "32px 0",
          background: "var(--off-white)",
        }}
      >
        {shadows.map((s) => (
          <div
            key={s.token}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 120,
                height: 120,
                background: "var(--white)",
                boxShadow: `var(${s.token})`,
                borderRadius: "var(--radius-md)",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--dark)",
                fontWeight: 600,
              }}
            >
              {s.token}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--muted)",
                textAlign: "center",
              }}
            >
              {s.value}
            </span>
          </div>
        ))}
      </div>

      <SectionHead>Motion easings</SectionHead>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr",
          gap: 16,
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--muted)",
        }}
      >
        <strong style={{ color: "var(--dark)" }}>--ease-out</strong>
        <span>cubic-bezier(0.2, 0.7, 0.2, 1) · default exit / reveal curve</span>
        <strong style={{ color: "var(--dark)" }}>--ease-in-out</strong>
        <span>cubic-bezier(0.65, 0, 0.35, 1) · scroll-driven transitions</span>
        <strong style={{ color: "var(--dark)" }}>--dur-fast</strong>
        <span>200ms · hover, focus, button state</span>
        <strong style={{ color: "var(--dark)" }}>--dur-mid</strong>
        <span>350ms · panel transitions, nav theme flip</span>
        <strong style={{ color: "var(--dark)" }}>--dur-slow</strong>
        <span>1100ms · hero reveal, scroll-driven parallax beats</span>
      </div>
    </div>
  );
}
