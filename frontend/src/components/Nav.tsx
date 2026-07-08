import { client } from "@/lib/sanity/client";
import { navSectionQuery } from "@/lib/sanity/queries";
import { FLAGS } from "@/flags";
import NavClient, { type NavLink } from "./NavClient";

type NavData = {
  brandWordPrimary?: string;
  brandWordItalic?: string;
  brandAriaLabel?: string;
  navLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  mobileMenuLabel?: string;
};

const DEFAULTS = {
  brandWordPrimary: "conscious",
  brandWordItalic: "pregnancy",
  brandAriaLabel: "Conscious Pregnancy home",
  navLinks: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Journal", href: "/journal" },
  ] satisfies NavLink[],
  ctaLabel: "Begin Your Journey",
  ctaHref: "/#contact",
  mobileMenuLabel: "Menu",
};

export default async function Nav() {
  const data = await client.fetch<NavData | null>(navSectionQuery).catch(() => null);

  // Hide links to held-back pages regardless of whether they come from Sanity
  // or the fallback defaults. Match on the destination path so a Sanity-authored
  // "/services" or "/journal" link is filtered too.
  const resolvedLinks = data?.navLinks?.length ? data.navLinks : DEFAULTS.navLinks;
  const navLinks = resolvedLinks.filter((link) => {
    if (FLAGS.OMIT_NAV_LINKS.services && /^\/services(\/|$)/.test(link.href)) return false;
    if (FLAGS.OMIT_NAV_LINKS.journal && /^\/journal(\/|$)/.test(link.href)) return false;
    return true;
  });

  return (
    <NavClient
      brandWordPrimary={data?.brandWordPrimary?.trim() || DEFAULTS.brandWordPrimary}
      brandWordItalic={data?.brandWordItalic?.trim() || DEFAULTS.brandWordItalic}
      brandAriaLabel={data?.brandAriaLabel?.trim() || DEFAULTS.brandAriaLabel}
      navLinks={navLinks}
      ctaLabel={data?.ctaLabel?.trim() || DEFAULTS.ctaLabel}
      ctaHref={data?.ctaHref?.trim() || DEFAULTS.ctaHref}
      mobileMenuLabel={data?.mobileMenuLabel?.trim() || DEFAULTS.mobileMenuLabel}
    />
  );
}
