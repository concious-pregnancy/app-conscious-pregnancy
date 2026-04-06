'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    q: 'Do you accept insurance?',
    a: 'Functional medicine is not covered by insurance. Lab work can often be run through your insurance or ordered at direct-pay rates that are significantly lower than standard billing. Ashley will walk you through options before ordering anything.',
  },
  {
    q: 'Can I work with you if I\'m not in California?',
    a: 'Yes. Telehealth is available nationwide for consultations, follow-ups, and psychedelic integration support. In-person visits and acupuncture are available in Venice, CA.',
  },
  {
    q: 'What\'s the difference between functional medicine and my regular doctor?',
    a: 'Conventional medicine is exceptional for acute care and emergencies. Functional medicine is built for chronic conditions — it spends the time to find upstream causes rather than managing downstream symptoms. The two approaches work best together, not against each other.',
  },
  {
    q: 'What does psychedelic integration actually involve?',
    a: 'Integration is the work that happens before and after a psychedelic experience — not during. Before: understanding your intention, preparing your nervous system, setting realistic expectations. After: making sense of what emerged, grounding insights into daily life, working through difficult material that surfaced.',
  },
  {
    q: 'How many appointments will I need?',
    a: 'That depends entirely on your situation. Simple hormonal or gut issues might resolve in 3-4 follow-ups. Complex, multi-system conditions take longer. Ashley will give you her honest assessment after the initial intake.',
  },
  {
    q: 'Do you prescribe medication?',
    a: 'Ashley can prescribe medications when appropriate and is licensed to do so. The goal is always to address root causes so medications — pharmaceutical or botanical — can be minimized or eliminated over time, not relied on indefinitely.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className={`section ${styles.faq}`}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.left}>
            <p className="section-label">Questions</p>
            <h2 className="section-title">
              Things people<br />
              <em>usually ask first.</em>
            </h2>
          </div>

          <div className={styles.items}>
            {faqs.map((item, i) => (
              <div
                key={i}
                className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
              >
                <button
                  className={styles.question}
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                >
                  <span>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {open === i ? '−' : '+'}
                  </span>
                </button>
                {open === i && (
                  <div className={styles.answer}>
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
