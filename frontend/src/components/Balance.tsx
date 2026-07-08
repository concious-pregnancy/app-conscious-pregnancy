"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Balance.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type BalanceContent = {
  invitationEyebrow?: string;
  invitationHeading?: string;
  invitationBody?: string;
  palaceEyebrow?: string;
  palaceHeading?: string;
  palaceBody?: string;
  palaceCtaLabel?: string;
} | null;

export default function Balance({ content }: { content?: BalanceContent }) {
  const invitationEyebrow = content?.invitationEyebrow ?? "The Invitation";
  const invitationHeading =
    content?.invitationHeading ??
    "The health and vitality you bring into conception is the very first gift you give your child.";
  const invitationBody =
    content?.invitationBody ??
    "Conscious Pregnancy starts here: with the understanding that what you bring into conception shapes the world your child enters. A body prepared. A relationship strengthened. A home made ready.";
  const palaceEyebrow = content?.palaceEyebrow ?? "Prepping the Palace";
  const palaceHeading =
    content?.palaceHeading ??
    "Both partners. One window. The most important preparation you will ever make.";
  const palaceBody =
    content?.palaceBody ??
    "In TCM, the palace is prepared before the new life takes up residence. The 90-day preconception window is that preparation. What you bring into conception, physically, emotionally, energetically, becomes the very first environment your child knows.";
  const palaceCtaLabel = content?.palaceCtaLabel ?? "Start Your Journey Together";

  const sectionRef = useRef<HTMLElement>(null);

  // Scoped to sectionRef so the ScrollTrigger + toggle listener created here
  // are torn down when Balance unmounts (route change away from /) and rebuilt
  // on remount. This logic used to live in MotionProvider, which never unmounts
  // on route change, so after /about → / navigation it held stale references to
  // the OLD panel nodes. The freshly-mounted panels never got data-is-active,
  // so they stayed at opacity:0 (text never animated in). Same fix pattern as
  // Process.
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      const section = sectionRef.current;
      if (!section) return;

      const stage = section.querySelector<HTMLElement>("[data-balance-stage]");
      const panels = Array.from(section.querySelectorAll<HTMLElement>("[data-balance-panel]"));
      const toggle = section.querySelector<HTMLElement>("[data-balance-toggle]");
      if (!stage || panels.length === 0) return;

      let userLocked: "light" | "dark" | null = null;
      let lockTimer: number | null = null;

      const setState = (state: "light" | "dark") => {
        stage.setAttribute("data-is-dark", state === "dark" ? "true" : "false");
        panels.forEach((p) => {
          const active = p.getAttribute("data-balance-panel") === state;
          p.setAttribute("data-is-active", active ? "true" : "false");
        });
      };

      setState("light");

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (userLocked) return;
          setState(self.progress > 0.5 ? "dark" : "light");
        },
      });

      const onToggleClick = () => {
        const nextDark = stage.getAttribute("data-is-dark") !== "true";
        setState(nextDark ? "dark" : "light");
        userLocked = nextDark ? "dark" : "light";
        if (lockTimer) window.clearTimeout(lockTimer);
        lockTimer = window.setTimeout(() => {
          userLocked = null;
          ScrollTrigger.refresh();
        }, 2500);
      };

      toggle?.addEventListener("click", onToggleClick);

      return () => {
        if (lockTimer) window.clearTimeout(lockTimer);
        toggle?.removeEventListener("click", onToggleClick);
        trigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" data-section="balance" className={styles.balance}>
      <div className={styles.stage} data-balance-stage>
        <div className={styles.arcs} aria-hidden="true">
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
            <ellipse className={styles.arc} cx="200" cy="500" rx="720" ry="520" />
            <ellipse className={styles.arc} cx="1400" cy="400" rx="680" ry="560" />
          </svg>
        </div>

        <div className={styles.toggleWrap}>
          <span className={styles.toggleLabel}>Balance</span>
          <button className={styles.toggle} data-balance-toggle aria-label="Toggle balance state">
            <span className={styles.toggleDot} data-balance-slider />
          </button>
        </div>

        <div className={styles.panels}>
          <div className={`${styles.panel} ${styles.panelLight}`} data-balance-panel="light">
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
            <p className={styles.eyebrow}>{invitationEyebrow}</p>
            <h2 className={styles.h2}>{invitationHeading}</h2>
            <p className={styles.body}>{invitationBody}</p>
          </div>

          <div className={`${styles.panel} ${styles.panelDark}`} data-balance-panel="dark">
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
            <p className={styles.eyebrow}>{palaceEyebrow}</p>
            <h2 className={styles.h2}>{palaceHeading}</h2>
            <p className={styles.body}>{palaceBody}</p>
            <div className={styles.cta}>
              <a href="#contact" className="btn btn-ghost-light">
                {palaceCtaLabel}
                <span className="btn-dot" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
