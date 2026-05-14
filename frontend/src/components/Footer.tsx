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
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "footer" }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Something went wrong, please try again.");
      }
      setSubscribed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong, please try again.");
    } finally {
      setSubmitting(false);
    }
  }

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
            {subscribed ? (
              <p className={styles.fineprint}>You&apos;re on the list. Thank you.</p>
            ) : (
              <>
                <form className={styles.form} onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder="your email address"
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={submitting} aria-busy={submitting}>
                    {submitting ? "Subscribing..." : "Subscribe"} <span className={styles.arrow} />
                  </button>
                </form>
                {error ? (
                  <p role="alert" className={styles.fineprint} style={{ color: "#a33" }}>
                    {error}
                  </p>
                ) : (
                  <p className={styles.fineprint}>
                    By signing up you agree to our <a href="#">Privacy Policy</a>.
                  </p>
                )}
              </>
            )}
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
