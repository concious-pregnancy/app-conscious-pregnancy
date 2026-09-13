// Renders nothing when data is null, so callers can pass an optional node.
// "<" is escaped because some nodes carry Sanity text, and a literal
// "</script>" in it would close the tag early.
export function JsonLd({ data }: { data: Record<string, unknown> | null }) {
  if (!data) return null;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
