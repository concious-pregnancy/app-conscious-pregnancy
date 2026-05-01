"use client";

import { useState } from "react";
import styles from "./Balance.module.css";

const slides = [
  {
    key: "invitation",
    label: "The Invitation",
    toggleLabel: "The Invitation",
    heading: "The health and vitality you bring into conception is the very first gift you give your child.",
    body: "Conscious Pregnancy starts here: with the understanding that what you bring into conception shapes the world your child enters. A body prepared. A relationship strengthened. A home made ready.",
    cta: "Start Your Journey Together",
  },
  {
    key: "palace",
    label: "Prepping the Palace",
    toggleLabel: "Prepping the Palace",
    heading: "Both partners. One window. The most important preparation you will ever make.",
    body: "In TCM, the palace is prepared before the new life takes up residence. The 90-day preconception window is that preparation. What you bring into conception, physically, emotionally, energetically, becomes the very first environment your child knows.",
    cta: "Learn About the Program",
  },
];

export default function Balance() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  return (
    <section id="about" data-section="balance" className={`section ${styles.balance}`}>
      <div className={`container ${styles.inner}`}>

        {/* Toggle */}
        <div className={styles.toggle} role="tablist">
          {slides.map((s, i) => (
            <button
              key={s.key}
              role="tab"
              aria-selected={active === i}
              className={`${styles.toggleBtn} ${active === i ? styles.toggleBtnActive : ""}`}
              onClick={() => setActive(i)}
            >
              {s.toggleLabel}
            </button>
          ))}
          <span
            className={styles.togglePill}
            style={{ transform: `translateX(${active * 100}%)` }}
          />
        </div>

        {/* Lotus icon */}
        <svg className={styles.icon} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M32 8c0 0 6 12 6 24s-6 24-6 24-6-12-6-24S32 8 32 8z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M32 20c0 0-14 4-20 14s-4 20-4 20 14-4 20-14 4-20 4-20z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M32 20c0 0 14 4 20 14s4 20 4 20-14-4-20-14-4-20-4-20z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Content — keyed so React re-mounts and CSS transition fires */}
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
