"use client";

import { useState } from "react";
import styles from "./FAQ.module.css";

type FaqItem = {
  _id: string;
  question: string;
  answer: string;
};

type FaqSection = {
  headingLine1?: string;
  headingLine2Em?: string;
} | null;

export default function FAQ({
  items,
  sectionContent,
}: {
  items: FaqItem[];
  sectionContent?: FaqSection;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const headingLine1 = sectionContent?.headingLine1 ?? "Your questions.";
  const headingLine2Em = sectionContent?.headingLine2Em ?? "Answered.";

  return (
    <section id="faq" data-section="faq" className={`section ${styles.faq}`}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.left}>
            <h2 data-reveal className={styles.title}>
              {headingLine1}
              <br />
              <em>{headingLine2Em}</em>
            </h2>
          </div>

          <div className={styles.items}>
            {items.map((item, i) => (
              <div
                key={item._id}
                className={`${styles.item} ${open === i ? styles.itemOpen : ""}`}
                data-stagger
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.question}</span>
                  <span className={styles.icon} aria-hidden="true">
                    +
                  </span>
                </button>
                <div id={`faq-answer-${i}`} className={styles.answer} aria-hidden={open !== i}>
                  <div className={styles.answerInner}>
                    <p>{item.answer}</p>
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
