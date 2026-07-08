/**
 * Repair legacy hrefs stored in Sanity from before Contact and About became
 * their own routes. Existing documents still carry "#contact" / "#credentials"
 * (both now dead) plus bare "#about" / "#services" anchors that only resolve on
 * "/". Normalizing at render time keeps the fix in code, so it holds without
 * editing the client's dataset (initialValue only reaches NEW documents).
 *
 * Used everywhere a Sanity-authored href is consumed (nav CTA, footer sitemap,
 * journal + service closing CTAs) so the whole site lands on live routes.
 */
export function normalizeHref(href: string): string {
  const h = href.trim();
  if (/^\/?#contact$/.test(h)) return "/contact";
  if (/^\/?#credentials$/.test(h)) return "/about";
  // Bare home-section anchors need a leading "/" so they work from any page
  // (e.g. "#about" from /contact would target the nonexistent /contact#about).
  if (h.startsWith("#")) return `/${h}`;
  return h;
}
