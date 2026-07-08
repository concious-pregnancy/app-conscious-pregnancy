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
  // Only links to real, rendered destinations. The home-section anchors are
  // "/"-prefixed so they resolve from any page (a bare "#contact" did nothing
  // from /about). Placeholder and held-back links (Programs, Process, Discovery
  // Call, Patient Portal, Instagram, Golden Life Wellness, Press, Privacy) were
  // removed since those pages/features don't exist yet.
  sitemapColumn1: [
    { label: "Approach", href: "/#about" },
    { label: "Services", href: "/#services" },
  ] satisfies FooterLink[],
  sitemapColumn2: [
    { label: "Contact", href: "/#contact" },
    { label: "Dr. Ashley Alden", href: "/#credentials" },
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
  const column1 = (
    data?.sitemapColumn1?.length ? data.sitemapColumn1 : DEFAULTS.sitemapColumn1
  ).filter((l) => isLiveHref(l.href));
  const column2 = (
    data?.sitemapColumn2?.length ? data.sitemapColumn2 : DEFAULTS.sitemapColumn2
  ).filter((l) => isLiveHref(l.href));

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
