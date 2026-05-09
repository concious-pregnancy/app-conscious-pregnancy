type Swatch = { name: string; token: string; cssVar: string; textDark?: boolean };

const neutrals: Swatch[] = [
  { name: "White", token: "--white", cssVar: "var(--white)" },
  { name: "Off-white", token: "--off-white", cssVar: "var(--off-white)" },
  { name: "Paper", token: "--paper", cssVar: "var(--paper)" },
  { name: "Muted", token: "--muted", cssVar: "var(--muted)", textDark: true },
  { name: "Dark mid", token: "--dark-mid", cssVar: "var(--dark-mid)", textDark: true },
  { name: "Dark", token: "--dark", cssVar: "var(--dark)", textDark: true },
];

const sage: Swatch[] = [
  { name: "Sage light", token: "--sage-light", cssVar: "var(--sage-light)" },
  { name: "Sage", token: "--sage", cssVar: "var(--sage)", textDark: true },
  { name: "Sage dark", token: "--sage-dark", cssVar: "var(--sage-dark)", textDark: true },
  { name: "Teal deep", token: "--teal-deep", cssVar: "var(--teal-deep)", textDark: true },
  { name: "Teal deeper", token: "--teal-deeper", cssVar: "var(--teal-deeper)", textDark: true },
];

const gold: Swatch[] = [
  { name: "Gold light", token: "--gold-light", cssVar: "var(--gold-light)" },
  { name: "Gold", token: "--gold", cssVar: "var(--gold)" },
  { name: "Gold deep", token: "--gold-deep", cssVar: "var(--gold-deep)", textDark: true },
];

const overlays: Swatch[] = [
  { name: "Border", token: "--border", cssVar: "rgba(46, 50, 49, 0.12)" },
  { name: "Border strong", token: "--border-strong", cssVar: "rgba(46, 50, 49, 0.2)" },
  { name: "Border light", token: "--border-light", cssVar: "rgba(255, 255, 255, 0.12)" },
  { name: "Veil", token: "--veil", cssVar: "rgba(46, 50, 49, 0.55)", textDark: true },
];

function SwatchRow({ swatches }: { swatches: Swatch[] }) {
  return (
    <div style={{ display: "flex", gap: 0, border: "1px solid var(--border)" }}>
      {swatches.map((s) => (
        <div
          key={s.token}
          style={{
            flex: 1,
            background: s.cssVar,
            padding: "20px 14px 16px",
            minHeight: 110,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: 4,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: s.textDark ? "rgba(255,255,255,0.92)" : "var(--dark)",
            }}
          >
            {s.name}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.04em",
              color: s.textDark ? "rgba(255,255,255,0.65)" : "var(--muted)",
            }}
          >
            {s.token}
          </span>
        </div>
      ))}
    </div>
  );
}

function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "var(--muted)",
        marginBottom: 12,
        marginTop: 48,
        paddingBottom: 12,
        borderBottom: "1px solid var(--border)",
      }}
    >
      {children}
    </div>
  );
}

export default function ColorsPage() {
  return (
    <div style={{ padding: "64px 64px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ marginBottom: 8 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--dark)",
          }}
        >
          Colour system
        </span>
      </div>

      <GroupLabel>Neutrals</GroupLabel>
      <SwatchRow swatches={neutrals} />

      <GroupLabel>Sage and teal · structural accent</GroupLabel>
      <SwatchRow swatches={sage} />

      <GroupLabel>Gold · warm differentiator</GroupLabel>
      <SwatchRow swatches={gold} />

      <GroupLabel>Borders and overlays</GroupLabel>
      <SwatchRow swatches={overlays} />

      <div style={{ marginTop: 56, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          Usage rules
        </span>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--muted)",
            lineHeight: 1.7,
            marginTop: 12,
            maxWidth: 640,
          }}
        >
          Sage is the primary accent. Use --sage for body label colour, --sage-dark for hover and
          interactive emphasis, --sage-light for italic display accents and the trigram mark. Gold
          is reserved for warm callouts and signposting; it should never carry primary actions. Dark
          surfaces use --dark with the .noise-overlay helper to introduce texture.
        </p>
      </div>
    </div>
  );
}
