"use client";

import { useState, useEffect } from "react";
import styles from "./Nav.module.css";

const links = [
  { href: "#about", label: "Pregnancy Prep" },
  { href: "#services", label: "Modalities" },
  { href: "#process", label: "How It Works" },
  { href: "#credentials", label: "Dr. Alden" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [lightBg, setLightBg] = useState(false);
  const [overFooter, setOverFooter] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stage = document.querySelector<HTMLElement>("[data-balance-stage]");

    const syncLightBg = () => {
      // Balance stage flips data-is-dark="true" when its panel transitions
      // to the off-white background. Once that happens (or the user has
      // scrolled past balance entirely), the page underneath the nav is
      // light and the logo + links need to flip to teal-on-white.
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
  }, []);

  return (
    <nav
      className={`${styles.nav} ${lightBg ? styles.lightBg : ""} ${overFooter ? styles.overFooter : ""}`}
    >
      <a href="#" className={styles.logo}>
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
        conscious&mdash;pregnancy
      </a>

      <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className={`btn btn-primary ${styles.cta}`}>
        <span className="btn-dot" />
        Begin Your Journey
      </a>

      <button
        className={styles.menuBtn}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        Menu
      </button>
    </nav>
  );
}
