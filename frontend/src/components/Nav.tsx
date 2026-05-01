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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <a href="#" className={styles.logo}>
        <svg className={styles.logoTrigram} viewBox="0 0 34 22" width="22" height="15" aria-hidden="true" fill="currentColor">
          <rect x="0" y="1" width="14" height="2" />
          <rect x="20" y="1" width="14" height="2" />
          <rect x="0" y="10" width="14" height="2" />
          <rect x="20" y="10" width="14" height="2" />
          <rect x="0" y="19" width="34" height="2" />
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
