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
  signupFineprint: "By signing up you agree to our {{privacy}}.",
  privacyHref: "#",
  sitemapColumn1: [
    { label: "Approach", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Programs", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "Discovery Call", href: "#contact" },
    { label: "Patient Portal", href: "#" },
  ] satisfies FooterLink[],
  sitemapColumn2: [
    { label: "Contact", href: "#contact" },
    { label: "Instagram", href: "#" },
    { label: "Dr. Ashley Alden", href: "#credentials" },
    { label: "Golden Life Wellness", href: "#" },
    { label: "Press", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ] satisfies FooterLink[],
  brandWordPrimary: "conscious",
  brandWordItalic: "pregnancy",
  copyrightTemplate: "© {{year}} Conscious Pregnancy. A Golden Life Wellness practice. Venice, CA.",
};

export default async function Footer() {
  const data = await client.fetch<FooterData | null>(footerSectionQuery).catch(() => null);

  const template = data?.copyrightTemplate?.trim() || DEFAULTS.copyrightTemplate;
  const copyrightLine = template.replace("{{year}}", String(new Date().getFullYear()));

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
      sitemapColumn1={data?.sitemapColumn1?.length ? data.sitemapColumn1 : DEFAULTS.sitemapColumn1}
      sitemapColumn2={data?.sitemapColumn2?.length ? data.sitemapColumn2 : DEFAULTS.sitemapColumn2}
      brandWordPrimary={data?.brandWordPrimary?.trim() || DEFAULTS.brandWordPrimary}
      brandWordItalic={data?.brandWordItalic?.trim() || DEFAULTS.brandWordItalic}
      copyrightLine={copyrightLine}
    />
  );
}
