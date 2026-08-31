"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ModeToggle from "./ModeToggle";
import styles from "./Nav.module.css";

export type NavLink = { label: string; href: string };

export type NavClientProps = {
  brandWordPrimary: string;
  brandWordItalic: string;
  brandAriaLabel: string;
  navLinks: NavLink[];
  ctaLabel: string;
  ctaHref: string;
  mobileMenuLabel: string;
};

export default function NavClient({
  brandWordPrimary,
  brandWordItalic,
  brandAriaLabel,
  navLinks,
  ctaLabel,
  ctaHref,
  mobileMenuLabel,
}: NavClientProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [lightBg, setLightBg] = useState(!isHome);
  const [overFooter, setOverFooter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Nav-over-footer color flip. Driven by IntersectionObserver so nothing
    // runs on each scroll frame as the tall footer enters. The old code read
    // footer.offsetTop on every scroll tick, which forces a synchronous layout
    // every frame and stutters the scroll right where the 100svh footer (with
    // its scaled background + veil) comes in. The flip still happens, and the
    // natural pause as you settle into the footer is untouched.
    const footer = document.getElementById("footer");
    const NAV_H = 64;
    let footerObserver: IntersectionObserver | null = null;
    const makeFooterObserver = () => {
      footerObserver?.disconnect();
      if (!footer) return;
      // Shrink the observer root to a 1px line at y=NAV_H. The footer only
      // intersects that line once its top edge scrolls above the nav, i.e.
      // exactly when the nav is sitting over the footer.
      const bottomInset = Math.max(0, window.innerHeight - (NAV_H + 1));
      footerObserver = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting), {
        rootMargin: `-${NAV_H}px 0px -${bottomInset}px 0px`,
        threshold: 0,
      });
      footerObserver.observe(footer);
    };
    makeFooterObserver();
    const onResize = () => makeFooterObserver();
    window.addEventListener("resize", onResize);

    // Off the home page the nav always sits on a light background.
    if (!isHome) {
      setLightBg(true);
      return () => {
        footerObserver?.disconnect();
        window.removeEventListener("resize", onResize);
      };
    }

    // Home: flip to the light-background treatment once the hero photo has
    // scrolled past / the Balance section has gone dark.
    const stage = document.querySelector<HTMLElement>("[data-balance-stage]");

    const syncLightBg = () => {
      if (!stage) {
        setLightBg(window.scrollY > 60);
        return;
      }
      const balanceLight = stage.getAttribute("data-is-dark") === "true";
      const rect = stage.getBoundingClientRect();
      const pastBalance = rect.bottom <= 0;
      setLightBg(balanceLight || pastBalance);
    };

    window.addEventListener("scroll", syncLightBg, { passive: true });
    syncLightBg();

    let observer: MutationObserver | null = null;
    if (stage) {
      observer = new MutationObserver(syncLightBg);
      observer.observe(stage, { attributes: true, attributeFilter: ["data-is-dark"] });
    }

    return () => {
      footerObserver?.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", syncLightBg);
      observer?.disconnect();
    };
  }, [isHome, pathname]);

  return (
    <nav
      className={`${styles.nav} ${lightBg ? styles.lightBg : ""} ${overFooter ? styles.overFooter : ""}`}
      aria-label={brandAriaLabel}
    >
      <Link href="/" className={styles.logo} aria-label={brandAriaLabel}>
        <svg
          className={styles.logoTrigram}
          viewBox="0 0 34 22"
          width="22"
          height="15"
          aria-hidden="true"
          fill="currentColor"
        >
          <rect x="0" y="1" width="34" height="2" />
          <rect x="0" y="10" width="14" height="2" />
          <rect x="20" y="10" width="14" height="2" />
          <rect x="0" y="19" width="14" height="2" />
          <rect x="20" y="19" width="14" height="2" />
        </svg>
        {brandWordPrimary}&mdash;{brandWordItalic}
      </Link>

      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        {navLinks.map((l) => {
          const active = l.href.startsWith("/") && !l.href.includes("#") && pathname === l.href;
          return (
            <li key={l.href + l.label}>
              <Link
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={active ? styles.activeLink : undefined}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
        {/* Contact lives in the menu on mobile, where the top-bar "Begin Your
            Journey" CTA is hidden. Desktop keeps the CTA, so this row only
            shows once the nav has collapsed to the mobile layout. */}
        <li className={styles.menuCtaItem}>
          <Link
            href={ctaHref}
            onClick={() => setMenuOpen(false)}
            className={pathname === ctaHref ? styles.activeLink : undefined}
          >
            Contact
          </Link>
        </li>
        {/* Mode toggle lives in the menu on mobile, where the top-bar toggle
            is hidden. Keeps yin/yang reachable once the nav collapses. Hidden
            on desktop (the top-bar toggle covers those widths). */}
        <li className={styles.menuToggleItem}>
          <ModeToggle />
        </li>
      </ul>

      <div className={styles.modeToggleSlot}>
        <ModeToggle />
      </div>

      <Link href={ctaHref} className={`btn btn-primary ${styles.cta}`}>
        <span className="btn-dot" />
        {ctaLabel}
      </Link>

      <button
        className={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        {mobileMenuLabel}
      </button>
    </nav>
  );
}
