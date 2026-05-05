import styles from "./Ready.module.css";

type ReadyContent = {
  headingLine1?: string;
  headingEm?: string;
  sub?: string;
  ctaLabel?: string;
  trustLabel?: string;
  ratingText?: string;
  chatIntro?: string;
  chatEmail?: string;
} | null;

export default function Ready({ content }: { content?: ReadyContent }) {
  const headingLine1 = content?.headingLine1 ?? "Ready to find";
  const headingEm = content?.headingEm ?? "your path?";
  const sub =
    content?.sub ??
    "Every step is flexible, we adapt to your needs, pace, and comfort level. Whether you're here for a short chapter or a longer journey, we'll walk it together.";
  const ctaLabel = content?.ctaLabel ?? "Start Your Journey";
  const trustLabel = content?.trustLabel ?? "Trusted by 80+ clients";
  const ratingText = content?.ratingText ?? "Excellent 4.9 out of 5";
  const chatIntro = content?.chatIntro ?? "Prefer to chat first?";
  const chatEmail = content?.chatEmail ?? "#contact";

  return (
    <section id="ready" data-section="ready" className={styles.ready}>
      <div className={styles.curve} aria-hidden="true">
        <svg viewBox="0 0 1600 600" preserveAspectRatio="none">
          <path
            d="M -50 80
               C 320 20, 540 320, 820 200
               S 1280 60, 1450 280
               C 1560 420, 1100 540, 760 460
               S 240 520, -50 380"
          />
          <path
            d="M 100 540
               C 360 420, 700 460, 980 380
               S 1500 240, 1700 320"
          />
        </svg>
      </div>

      <div className={styles.inner}>
        <div className={styles.left} data-reveal>
          <h2 className={styles.h2}>
            {headingLine1}
            <br />
            <em>{headingEm}</em>
          </h2>
          <p className={styles.sub}>{sub}</p>
          <a href="#contact" className={`btn ${styles.pill}`}>
            {ctaLabel}
            <span className="btn-dot" />
          </a>
        </div>

        <div className={styles.right} data-reveal>
          <p className={styles.trustLabel}>{trustLabel}</p>
          <div className={styles.avatars} aria-hidden="true">
            <span
              className={styles.av}
              style={{ backgroundImage: "url('/avatars/avatar-1.jpg')" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "url('/avatars/avatar-2.jpg')" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "url('/avatars/avatar-3.jpg')" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "url('/avatars/avatar-4.jpg')" }}
            />
            <span
              className={styles.av}
              style={{ backgroundImage: "url('/avatars/avatar-5.jpg')" }}
            />
            <span className={`${styles.av} ${styles.avCount}`}>+81</span>
          </div>

          <div className={styles.rating}>
            <strong>{ratingText}</strong>
            <svg className={styles.star} viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M10 1l2.39 4.84L18 6.76l-4 3.9.94 5.5L10 13.77l-4.94 2.39L6 10.66 2 6.76l5.61-.92L10 1z"
                fill="#00b67a"
              />
            </svg>
            <span className={styles.trustpoint}>TrustPoint</span>
          </div>

          <p className={styles.chatLine}>
            {chatIntro}{" "}
            <a
              href={
                chatEmail.startsWith("http") || chatEmail.startsWith("mailto")
                  ? chatEmail
                  : `mailto:${chatEmail}`
              }
              className={styles.emailLink}
            >
              Send us an email
            </a>{" "}
            or connect with us on social, we&rsquo;re always happy to help.
          </p>

          <div className={styles.socials} aria-label="Social media links">
            <a href="#" aria-label="Instagram" className={styles.socialIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="#" aria-label="Threads" className={styles.socialIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C8 2 5 5 5 9c0 2.5 1.2 4.7 3 6.1C9.3 16.3 10.6 17 12 17s2.7-.7 4-1.9c1.8-1.4 3-3.6 3-6.1 0-4-3-7-7-7z" />
                <path d="M8.5 14.5C9.3 17 10.5 19 12 19s2.7-2 3.5-4.5" />
                <line x1="12" y1="17" x2="12" y2="22" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className={styles.socialIcon}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="3" />
                <polygon points="10,9 16,12 10,15" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
