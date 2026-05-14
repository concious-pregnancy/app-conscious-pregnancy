"use client";

import { useState } from "react";
import styles from "./Footer.module.css";

export type FooterLink = { label: string; href: string };

export type FooterClientProps = {
  signupHeadline: string;
  signupHeadlineEm: string;
  signupSub: string;
  signupPlaceholder: string;
  signupButtonLabel: string;
  signupSubmittingLabel: string;
  signupSuccessMessage: string;
  signupFineprint: string;
  privacyHref: string;
  sitemapColumn1: FooterLink[];
  sitemapColumn2: FooterLink[];
  brandWordPrimary: string;
  brandWordItalic: string;
  copyrightLine: string;
};

function FineprintWithPrivacyLink({ template, href }: { template: string; href: string }) {
  // Split on the {{privacy}} token so the link can be inlined inside the
  // editor-controlled string without dangerouslySetInnerHTML.
  const parts = template.split("{{privacy}}");
  if (parts.length === 1) return <>{template}</>;
  return (
    <>
      {parts[0]}
      <a href={href}>Privacy Policy</a>
      {parts[1]}
    </>
  );
}

export default function FooterClient({
  signupHeadline,
  signupHeadlineEm,
  signupSub,
  signupPlaceholder,
  signupButtonLabel,
  signupSubmittingLabel,
  signupSuccessMessage,
  signupFineprint,
  privacyHref,
  sitemapColumn1,
  sitemapColumn2,
  brandWordPrimary,
  brandWordItalic,
  copyrightLine,
}: FooterClientProps) {
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

  const columns = [sitemapColumn1, sitemapColumn2].filter((c) => c.length > 0);

  return (
    <footer id="footer" data-section="footer" className={styles.footer}>
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.veil} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <h2 className={styles.display}>
              {signupHeadline} <em>{signupHeadlineEm}</em>
            </h2>
            <p className={styles.sub}>{signupSub}</p>
            {subscribed ? (
              <p className={styles.fineprint}>{signupSuccessMessage}</p>
            ) : (
              <>
                <form className={styles.form} onSubmit={handleSubscribe}>
                  <input
                    type="email"
                    placeholder={signupPlaceholder}
                    aria-label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={submitting} aria-busy={submitting}>
                    {submitting ? signupSubmittingLabel : signupButtonLabel}{" "}
                    <span className={styles.arrow} />
                  </button>
                </form>
                {error ? (
                  <p role="alert" className={styles.fineprint} style={{ color: "#a33" }}>
                    {error}
                  </p>
                ) : (
                  <p className={styles.fineprint}>
                    <FineprintWithPrivacyLink template={signupFineprint} href={privacyHref} />
                  </p>
                )}
              </>
            )}
          </div>

          {columns.length > 0 && (
            <div className={styles.sitemap}>
              {columns.map((col, i) => (
                <ul key={i} className={styles.sitemapCol}>
                  {col.map((link) => (
                    <li key={link.label + link.href}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          )}
        </div>
        <div className={styles.bot}>
          <div className={styles.mark}>
            {brandWordPrimary} <em>{brandWordItalic}</em>
          </div>
          <div className={styles.meta}>
            <span>{copyrightLine}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
