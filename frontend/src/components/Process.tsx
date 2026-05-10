"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./Process.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type ProcessStep = { title: string; body: string };

type ProcessContent = {
  eyebrow?: string;
  headingLine1?: string;
  headingLine2Em?: string;
  lede?: string;
  steps?: ProcessStep[];
} | null;

const defaultSteps: ProcessStep[] = [
  {
    title: "Discovery Call",
    body: "We start with a conversation: where you are, what you want to optimize, and whether this program is the right fit. No pressure, no commitment. Just an honest look at what is possible.",
  },
  {
    title: "Functional Assessment",
    body: "Comprehensive lab work at pregnancy-specific reference ranges. Hormones, micronutrients, gut health, immune function, genetic markers. We map your unique biology before building your protocol.",
  },
  {
    title: "Personalized Protocol",
    body: "Your 90-day preconception plan is built around your labs, your history, and your goals. Acupuncture, somatic work, nutritional guidance, and integration support woven together as a single program.",
  },
  {
    title: "Ongoing Support",
    body: "Regular check-ins, protocol adjustments, and continued TCM care through the full preconception window and into early pregnancy. We stay with you through the whole arc.",
  },
];

export default function Process({ content }: { content?: ProcessContent }) {
  const eyebrow = content?.eyebrow ?? "Process";
  const headingLine1 = content?.headingLine1 ?? "How";
  const headingLine2Em = content?.headingLine2Em ?? "It Works";
  const lede =
    content?.lede ??
    "Getting started doesn’t have to be complicated. Our process is simple, supportive, and designed to move at a pace that feels right for you, from the first conversation to the changes you’ll see over time.";
  const steps = content?.steps?.length ? content.steps : defaultSteps;

  const trackRef = useRef<HTMLDivElement>(null);

  // Scoped to trackRef so the ScrollTrigger created here is automatically
  // killed when Process unmounts (route change away from /). Previously this
  // logic lived in MotionProvider (which never unmounts on route change), so
  // a stale ScrollTrigger held references to the OLD digit DOM nodes after
  // /journal → / navigation, leaving the new mount's digits with no
  // transforms applied — they all stacked at y:0. The user could reproduce
  // this by clicking "Begin your journey" from /journal (which jumps to
  // /#contact) and scrolling back up to the Process section.
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;
      const track = trackRef.current;
      if (!track) return;

      const digits = Array.from(track.querySelectorAll<HTMLElement>("[data-process-digit]"));
      const dots = Array.from(
        track.querySelectorAll<HTMLElement>("[data-process-progress] > span"),
      );
      const stepsParent = track.querySelector<HTMLElement>("[data-process-step]")?.parentElement;
      if (digits.length === 0 || !stepsParent) return;

      const n = digits.length;
      const dur = 0.57;
      let current = 0;

      // Park every digit before measuring scroll position. Without this initial
      // pass the freshly-mounted nodes have no transform and visually stack at
      // y:0 until the first ScrollTrigger update fires.
      const parkInitial = (idx: number) => {
        digits.forEach((el, i) => {
          if (i === idx) gsap.set(el, { y: 0 });
          else if (i < idx) gsap.set(el, { y: "-100vh" });
          else gsap.set(el, { y: "100vh" });
        });
        dots.forEach((d, i) => {
          d.setAttribute("data-is-on", i === idx ? "true" : "false");
        });
        current = idx;
      };

      const setDigit = (i: number) => {
        if (i === current) return;
        const prev = current;
        const forward = i > prev;
        current = i;

        // Kill ALL in-flight digit tweens, not just the prev/incoming pair.
        // When the user scrolls quickly (or the browser anchor-scrolls past
        // the section) ScrollTrigger fires onUpdate in rapid succession with
        // skip-step indices. The earlier prev-only kill left intermediate
        // digits stuck mid-tween at non-parking y values.
        gsap.killTweensOf(digits);

        // Park digits that are NOT prev/incoming so they sit at the right
        // off-screen position even after a fast skip-step scroll.
        digits.forEach((el, idx) => {
          if (idx === prev || idx === i) return;
          gsap.set(el, { y: idx < i ? "-100vh" : "100vh" });
        });

        gsap.to(digits[prev], {
          y: forward ? "-100vh" : "100vh",
          duration: dur,
          ease: "power3.out",
        });
        gsap.fromTo(
          digits[i],
          { y: forward ? "100vh" : "-100vh" },
          { y: 0, duration: dur, ease: "power3.out" },
        );

        dots.forEach((d, idx) => {
          d.setAttribute("data-is-on", idx === i ? "true" : "false");
        });
      };

      // Compute the initial digit from current scroll position. Critical when
      // the page mounts mid-scroll (cross-route navigation that lands at an
      // anchor like /#contact) — without this the initial state assumes
      // current=0, then ScrollTrigger fires its first update with progress~1
      // and the rapid 0→3 transition is what triggered the original race.
      const computeIdx = (): number => {
        const rect = stepsParent.getBoundingClientRect();
        const total = stepsParent.offsetHeight - window.innerHeight;
        if (total <= 0) return 0;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / total));
        return Math.min(n - 1, Math.max(0, Math.floor(progress * n * 0.999)));
      };

      parkInitial(computeIdx());

      const trigger = ScrollTrigger.create({
        trigger: stepsParent,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.max(0, Math.floor(self.progress * n * 0.999)));
          setDigit(idx);
        },
      });

      // After Lenis settles its initial smooth-scroll-into-anchor pass, the
      // computed start positions in ScrollTrigger may need a refresh so its
      // onUpdate fires with the correct progress.
      const refreshTimeout = window.setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => {
        window.clearTimeout(refreshTimeout);
        trigger.kill();
      };
    },
    { scope: trackRef },
  );

  return (
    <>
      <section id="process" data-section="process-intro" className={styles.intro}>
        <div className={styles.introInner}>
          <div className={styles.introLeft}>
            <p className={styles.introEyebrow}>{eyebrow}</p>
            <h2 className={styles.introDisplay}>
              {headingLine1} <em>{headingLine2Em}</em>
            </h2>
            <div className={styles.introRule} />
          </div>
          <p className={styles.introLede}>{lede}</p>
        </div>
      </section>

      <div ref={trackRef} className={styles.track} data-section="process">
        <div className={styles.inner}>
          <div className={styles.steps}>
            {steps.map((s, i) => (
              <div key={i} className={styles.step} data-process-step={i}>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.numPanel}>
            <div className={styles.numContent}>
              <span className={styles.numZero}>0</span>
              <div className={styles.numSlot}>
                {steps.map((s, i) => (
                  <span key={i} className={styles.numDigit} data-process-digit={i}>
                    {i + 1}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.progress} data-process-progress>
              {steps.map((s, i) => (
                <span key={i} data-is-on={i === 0 ? "true" : "false"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
