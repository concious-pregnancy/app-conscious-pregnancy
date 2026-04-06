"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    q: "When should we start preconception preparation?",
    a: "Ideally 3 to 6 months before you plan to conceive. Sperm take about 74 days to fully mature, and egg quality reflects the environment it develops in over the preceding months. Starting earlier means more time to address anything the labs reveal.",
  },
  {
    q: "Is this program for both partners?",
    a: "Yes. Paternal factors account for roughly 50% of fertility challenges, and sperm quality is directly shaped by nutrition, stress, sleep, and toxin exposure. Both partners preparing together produces meaningfully better outcomes than one partner going it alone.",
  },
  {
    q: "What does the functional lab work include?",
    a: "Comprehensive hormone panels using pregnancy-specific reference ranges, micronutrient status, thyroid function, gut health markers, immune function, toxin burden, and relevant genetic markers including MTHFR. We look at the full picture, not just fertility hormones.",
  },
  {
    q: "Do I need to have a fertility diagnosis to work with you?",
    a: "No. Most of our clients are healthy people who want to optimize before trying. You do not need a diagnosis to benefit from understanding your biology and preparing intentionally.",
  },
  {
    q: "How does acupuncture fit into preconception care?",
    a: "TCM has mapped the body's energetic patterns for thousands of years. In preconception care, acupuncture supports hormonal regulation, uterine blood flow, stress response, and the energetic qualities that TCM associates with a receptive environment for conception.",
  },
  {
    q: "What is psychedelic integration and who is it for?",
    a: "Psychedelic integration supports people in processing insights from prior psychedelic experiences, particularly around deep emotional or ancestral patterns. We offer this for preconception and postpartum work only, and it is one option within a broader program, not a requirement.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" data-section="faq" className={`section ${styles.faq}`}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.left}>
            <h2 data-reveal className={styles.title}>
              Your questions.
              <br />
              <em>Answered.</em>
            </h2>
          </div>

          <div className={styles.items}>
            {faqs.map((item, i) => (
              <div
                key={i}
                className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
                data-stagger
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    +
                  </span>
                </button>
                <div id={`faq-answer-${i}`} className={styles.answer} aria-hidden={open !== i}>
                  <div className={styles.answerInner}>
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
