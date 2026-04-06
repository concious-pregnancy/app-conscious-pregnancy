"use client";

import { useState, useEffect } from "react";
import styles from "./Nav.module.css";

const links = [
  { href: "#about", label: "The Reframe" },
  { href: "#services", label: "Modalities" },
  { href: "#process", label: "How It Works" },
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
        Conscious Pregnancy
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
