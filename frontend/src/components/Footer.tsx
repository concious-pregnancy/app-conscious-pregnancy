"use client";

import { useState } from "react";
import styles from "./Footer.module.css";

const sitemap = [
  [
    { label: "Approach", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Programs", href: "#pricing" },
    { label: "Process", href: "#process" },
    { label: "Discovery Call", href: "#contact" },
    { label: "Patient Portal", href: "#" },
  ],
  [
    { label: "Contact", href: "#contact" },
    { label: "Instagram", href: "#" },
    { label: "Dr. Ashley Alden", href: "#credentials" },
    { label: "Golden Life Wellness", href: "#" },
    { label: "Press", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ],
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="footer" data-section="footer" className={styles.footer}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <h2 className={styles.display}>
              Begin where you <em>actually are.</em>
            </h2>
            <p className={styles.sub}>
              A monthly note from Dr. Alden, slow reading on conscious conception, the body, and the
              work between knowing and changing.
            </p>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="your email address"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">
                Subscribe <span className={styles.arrow} />
              </button>
            </form>
            <p className={styles.fineprint}>
              By signing up you agree to our <a href="#">Privacy Policy</a>.
            </p>
          </div>

          <div className={styles.sitemap}>
            {sitemap.map((col, i) => (
              <ul key={i} className={styles.sitemapCol}>
                {col.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className={styles.bot}>
          <div className={styles.mark}>
            conscious <em>pregnancy</em>
          </div>
          <div className={styles.meta}>
            <span>
              &copy; 2026 Conscious Pregnancy. A Golden Life Wellness practice. Venice, CA.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
