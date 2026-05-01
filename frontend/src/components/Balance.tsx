"use client";

import { useState } from "react";
import styles from "./Balance.module.css";

const slides = [
  {
    key: "invitation",
    label: "The Invitation",
    heading: "The health and vitality you bring into conception is the very first gift you give your child.",
    body: "Conscious Pregnancy starts here: with the understanding that what you bring into conception shapes the world your child enters. A body prepared. A relationship strengthened. A home made ready.",
    cta: "Start Your Journey Together",
  },
  {
    key: "palace",
    label: "Prepping the Palace",
    heading: "Both partners. One window. The most important preparation you will ever make.",
    body: "In TCM, the palace is prepared before the new life takes up residence. The 90-day preconception window is that preparation. What you bring into conception, physically, emotionally, energetically, becomes the very first environment your child knows.",
    cta: "Learn About the Program",
  },
];

export default function Balance() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  const isSecond = active === 1;

  return (
    <section
      id="about"
      data-section="balance"
      data-is-second={isSecond ? "true" : "false"}
      className={`section ${styles.balance}`}
    >
      <div className={`container ${styles.inner}`}>

        {/* Toggle row */}
        <div className={styles.toggleRow}>
          <span className={styles.toggleLabel}>Balance</span>
          <button
            className={`${styles.toggle} ${isSecond ? styles.toggleOn : ""}`}
            onClick={() => setActive(isSecond ? 0 : 1)}
            aria-label="Toggle balance state"
            aria-pressed={isSecond}
          >
            <span className={styles.toggleDot} />
          </button>
        </div>

        {/* Lotus icon */}
        <svg className={styles.icon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M32 8c0 0 6 12 6 24s-6 24-6 24-6-12-6-24S32 8 32 8z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M32 20c0 0-14 4-20 14s-4 20-4 20 14-4 20-14 4-20 4-20z" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M32 20c0 0 14 4 20 14s4 20 4 20-14-4-20-14-4-20-4-20z" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>

        {/* Content */}
        <div key={slide.key} className={styles.content}>
          <p className={styles.label}>{slide.label}</p>
          <h2 className={styles.heading}>{slide.heading}</h2>
          <p className={styles.body}>{slide.body}</p>
          <a href="#contact" className={`btn btn-ghost ${styles.cta}`}>
            <span className="btn-dot" />
            {slide.cta}
          </a>
        </div>

      </div>
    </section>
  );
}
