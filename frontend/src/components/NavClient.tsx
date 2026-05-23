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
    if (!isHome) {
      setLightBg(true);
      const onScroll = () => {
        const footer = document.getElementById("footer");
        if (footer) {
          setOverFooter(window.scrollY + 64 >= footer.offsetTop);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

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

    const onScroll = () => {
      syncLightBg();
      const footer = document.getElementById("footer");
      if (footer) {
        setOverFooter(window.scrollY + 64 >= footer.offsetTop);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    syncLightBg();

    let observer: MutationObserver | null = null;
    if (stage) {
      observer = new MutationObserver(syncLightBg);
      observer.observe(stage, { attributes: true, attributeFilter: ["data-is-dark"] });
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
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
