import { client } from "@/lib/sanity/client";
import { footerSectionQuery } from "@/lib/sanity/queries";
import FooterClient, { type FooterLink } from "./FooterClient";

type FooterData = {
  signupHeadline?: string;
  signupHeadlineEm?: string;
  signupSub?: string;
  signupPlaceholder?: string;
  signupButtonLabel?: string;
  signupSubmittingLabel?: string;
  signupSuccessMessage?: string;
  signupFineprint?: string;
  privacyHref?: string;
  sitemapColumn1?: FooterLink[];
  sitemapColumn2?: FooterLink[];
  brandWordPrimary?: string;
  brandWordItalic?: string;
  copyrightTemplate?: string;
};

const DEFAULTS = {
  signupHeadline: "Begin where you",
  signupHeadlineEm: "actually are.",
  signupSub:
    "A monthly note from Dr. Alden, slow reading on conscious conception, the body, and the work between knowing and changing.",
  signupPlaceholder: "your email address",
  signupButtonLabel: "Subscribe",
  signupSubmittingLabel: "Subscribing...",
  signupSuccessMessage: "You're on the list. Thank you.",
  signupFineprint: "A monthly note, nothing more. Unsubscribe anytime.",
  privacyHref: "#",
  // Only links to real, rendered destinations. Contact is its own route now
  // (/contact). The remaining entries are home-page section anchors, "/"-prefixed
  // so they resolve from any page (a bare "#about" did nothing from /about).
  // Placeholder and held-back links (Programs, Process, Discovery Call, Patient
  // Portal, Instagram, Golden Life Wellness, Press, Privacy) were removed since
  // those pages/features don't exist yet.
  sitemapColumn1: [
    { label: "Approach", href: "/#about" },
    { label: "Services", href: "/#services" },
  ] satisfies FooterLink[],
  sitemapColumn2: [
    { label: "Contact", href: "/contact" },
    { label: "Dr. Ashley Alden", href: "/about" },
  ] satisfies FooterLink[],
  brandWordPrimary: "conscious",
  brandWordItalic: "pregnancy",
  copyrightTemplate: "© {{year}} Conscious Pregnancy. A Golden Life Wellness practice. Venice, CA.",
};

export default async function Footer() {
  const data = await client.fetch<FooterData | null>(footerSectionQuery).catch(() => null);

  const template = data?.copyrightTemplate?.trim() || DEFAULTS.copyrightTemplate;
  const copyrightLine = template.replace("{{year}}", String(new Date().getFullYear()));

  // Drop links whose destination is a bare "#" or empty, regardless of whether
  // they come from Sanity or the defaults, so no dead placeholder link ships.
  const isLiveHref = (href: string) => {
    const h = href?.trim() ?? "";
    return h !== "" && h !== "#";
  };

  // Repair legacy hrefs stored in Sanity from before Contact/About became their
  // own routes. The existing footer document still carries "#contact" and
  // "#credentials" (both now dead) plus bare "#about"/"#services" anchors that
  // only resolve on "/". Normalizing here means the fix holds without editing
  // the client's dataset. Kept in sync with the DEFAULTS above.
  const normalizeHref = (href: string): string => {
    const h = href.trim();
    if (/^\/?#contact$/.test(h)) return "/contact";
    if (/^\/?#credentials$/.test(h)) return "/about";
    // Bare home-section anchors need a leading "/" so they work from any page
    // (e.g. "#about" from /contact would target the nonexistent /contact#about).
    if (h.startsWith("#")) return `/${h}`;
    return h;
  };

  const prepare = (links: FooterLink[]) =>
    links.filter((l) => isLiveHref(l.href)).map((l) => ({ ...l, href: normalizeHref(l.href) }));

  const column1 = prepare(
    data?.sitemapColumn1?.length ? data.sitemapColumn1 : DEFAULTS.sitemapColumn1,
  );
  const column2 = prepare(
    data?.sitemapColumn2?.length ? data.sitemapColumn2 : DEFAULTS.sitemapColumn2,
  );

  return (
    <FooterClient
      signupHeadline={data?.signupHeadline?.trim() || DEFAULTS.signupHeadline}
      signupHeadlineEm={data?.signupHeadlineEm?.trim() || DEFAULTS.signupHeadlineEm}
      signupSub={data?.signupSub?.trim() || DEFAULTS.signupSub}
      signupPlaceholder={data?.signupPlaceholder?.trim() || DEFAULTS.signupPlaceholder}
      signupButtonLabel={data?.signupButtonLabel?.trim() || DEFAULTS.signupButtonLabel}
      signupSubmittingLabel={data?.signupSubmittingLabel?.trim() || DEFAULTS.signupSubmittingLabel}
      signupSuccessMessage={data?.signupSuccessMessage?.trim() || DEFAULTS.signupSuccessMessage}
      signupFineprint={data?.signupFineprint?.trim() || DEFAULTS.signupFineprint}
      privacyHref={data?.privacyHref?.trim() || DEFAULTS.privacyHref}
      sitemapColumn1={column1}
      sitemapColumn2={column2}
      brandWordPrimary={data?.brandWordPrimary?.trim() || DEFAULTS.brandWordPrimary}
      brandWordItalic={data?.brandWordItalic?.trim() || DEFAULTS.brandWordItalic}
      copyrightLine={copyrightLine}
    />
  );
}
