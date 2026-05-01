"use client";

import { useState } from "react";
import styles from "./Pricing.module.css";

type Plan = "single" | "plan";

interface Tier {
  name: string;
  desc: string;
  priceSingle: string;
  pricePlan: string;
  noteSingle?: string;
  notePlan?: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
}

const tiers: Tier[] = [
  {
    name: "Foundations",
    desc: "Six weeks. A starting point for couples who want a clear, evidence-based look at where they are.",
    priceSingle: "$X,XXX",
    pricePlan: "$X,XXX",
    notePlan: "3 monthly installments",
    features: [
      "Initial functional lab panel",
      "4 acupuncture sessions",
      "Personalized nutritional protocol",
      "Two follow-up consultations",
    ],
    ctaLabel: "Begin Here",
  },
  {
    name: "Prepping the Palace",
    desc: "Twelve weeks. The canonical program, both partners, all four lenses, weekly contact.",
    priceSingle: "$X,XXX",
    pricePlan: "$X,XXX",
    notePlan: "3 monthly installments",
    features: [
      "Full functional panel for both partners",
      "TCM diagnostics + weekly acupuncture",
      "Somatic healing sessions",
      "Weekly check-ins and protocol review",
      "Couples integration practices",
    ],
    ctaLabel: "Begin Together",
    featured: true,
  },
  {
    name: "The Full Arc",
    desc: "Twelve weeks preconception, then ongoing care through the first trimester. Includes deeper inherited-material work.",
    priceSingle: "$X,XXX",
    pricePlan: "$X,XXX",
    notePlan: "3 monthly installments",
    features: [
      "Everything in Prepping the Palace",
      "Psychedelic integration sessions",
      "Continued care through first trimester",
      "Birth-readiness somatic protocol",
      "Priority scheduling",
    ],
    ctaLabel: "Begin the Full Arc",
  },
];

export default function Pricing() {
  const [plan, setPlan] = useState<Plan>("single");

  return (
    <section id="pricing" data-section="pricing" className={styles.pricing}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Programs</p>
          <h2 className={styles.h2}>
            A pace that <em>fits the work.</em>
          </h2>
        </div>
        <p className={styles.sub}>
          Three programs of increasing depth. All begin with a discovery call. Choose a single
          intensive payment, or split it across three months.
        </p>
      </div>

      <div className={styles.toggleRow}>
        <div className={styles.toggle} role="tablist" aria-label="Pricing plan">
          <button
            type="button"
            className={plan === "single" ? styles.toggleOn : ""}
            onClick={() => setPlan("single")}
            role="tab"
            aria-selected={plan === "single"}
          >
            Single Intensive
          </button>
          <button
            type="button"
            className={plan === "plan" ? styles.toggleOn : ""}
            onClick={() => setPlan("plan")}
            role="tab"
            aria-selected={plan === "plan"}
          >
            Payment Plan
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {tiers.map((tier) => {
          const price = plan === "single" ? tier.priceSingle : tier.pricePlan;
          const note = plan === "single" ? (tier.noteSingle ?? "") : (tier.notePlan ?? "");
          return (
            <article
              key={tier.name}
              className={`${styles.tier} ${tier.featured ? styles.tierFeat : ""}`}
            >
              {tier.featured && <span className={styles.flag}>Recommended</span>}
              <h3 className={styles.tierName}>{tier.name}</h3>
              <p className={styles.tierDesc}>{tier.desc}</p>
              <div className={styles.tierPrice}>
                <span className={styles.amt}>{price}</span>
                <span className={styles.unit}>total</span>
              </div>
              <p className={styles.priceNote}>{note || " "}</p>
              <hr className={styles.line} />
              <ul className={styles.features}>
                {tier.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className={styles.cta}>
                <a
                  href="#contact"
                  className={`btn ${tier.featured ? "" : "btn-ghost"} ${styles.tierBtn}`}
                >
                  {tier.ctaLabel}
                  <span className="btn-dot" />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
