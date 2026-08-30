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
  brandWordPrimary: "conscious",
  brandWordItalic: "pregnancy",
  copyrightTemplate: "© {{year}} Conscious Pregnancy. A Golden Life Wellness practice. Venice, CA.",
};

export default async function Footer() {
  const data = await client.fetch<FooterData | null>(footerSectionQuery).catch(() => null);

  const template = data?.copyrightTemplate?.trim() || DEFAULTS.copyrightTemplate;
  const copyrightLine = template.replace("{{year}}", String(new Date().getFullYear()));

  // Sitemap link columns are dropped entirely per request: none of the
  // Sanity-authored destinations (Approach, Services, Programs, Process,
  // Discovery Call, Contact, Dr. Ashley Alden) resolved correctly.
  const column1: FooterLink[] = [];
  const column2: FooterLink[] = [];

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
