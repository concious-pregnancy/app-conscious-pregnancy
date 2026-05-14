import { client } from "@/lib/sanity/client";
import { navSectionQuery } from "@/lib/sanity/queries";
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

  return (
    <NavClient
      brandWordPrimary={data?.brandWordPrimary?.trim() || DEFAULTS.brandWordPrimary}
      brandWordItalic={data?.brandWordItalic?.trim() || DEFAULTS.brandWordItalic}
      brandAriaLabel={data?.brandAriaLabel?.trim() || DEFAULTS.brandAriaLabel}
      navLinks={data?.navLinks?.length ? data.navLinks : DEFAULTS.navLinks}
      ctaLabel={data?.ctaLabel?.trim() || DEFAULTS.ctaLabel}
      ctaHref={data?.ctaHref?.trim() || DEFAULTS.ctaHref}
      mobileMenuLabel={data?.mobileMenuLabel?.trim() || DEFAULTS.mobileMenuLabel}
    />
  );
}
