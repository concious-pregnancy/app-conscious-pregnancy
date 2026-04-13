"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MotionProvider() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    // ── Lenis smooth scroll ────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      gestureOrientation: "vertical",
      wheelMultiplier: 0.95,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);
    lenis.on("scroll", () => ScrollTrigger.update());

    const matchMedia = gsap.matchMedia();

    matchMedia.add("(min-width: 768px)", () => {
      // ── Scroll reveals: data-reveal ──────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
        gsap.set(node, { autoAlpha: 0, y: 28 });
        gsap.to(node, {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            once: true,
          },
        });
      });

      // ── Staggered reveals: data-stagger ─────────────────────────────────
      gsap.utils.toArray<HTMLElement>("section[data-section]").forEach((section) => {
        const staggerNodes = section.querySelectorAll<HTMLElement>("[data-stagger]");
        if (staggerNodes.length === 0) return;
        gsap.set(staggerNodes, { autoAlpha: 0, y: 24 });
        gsap.to(staggerNodes, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });

      // ── Hero: true parallax (background moves slower than scroll) ────────
      const heroSection = document.querySelector<HTMLElement>('section[data-section="hero"]');
      const heroBackground = heroSection?.querySelector<HTMLElement>("[data-hero-primary]");

      if (heroSection && heroBackground) {
        // Translate the background upward at ~30% of scroll speed.
        // The background starts at scale(1.08) so edges are always hidden
        // as it shifts up. Result: genuine depth, not just zoom.
        gsap.set(heroBackground, { scale: 1.08, transformOrigin: "center top" });
        gsap.to(heroBackground, {
          y: "-18%",
          ease: "none",
          scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ── Balance: scroll-pinned gradient + toggle ─────────────────────────
      const balanceSection = document.querySelector<HTMLElement>('[data-section="balance"]');
      const balanceInner = balanceSection?.querySelector<HTMLElement>("[data-balance-inner]");
      const balanceSlider = balanceSection?.querySelector<HTMLElement>("[data-balance-slider]");
      const balanceText1 = balanceSection?.querySelector<HTMLElement>("[data-balance-text-1]");
      const balanceText2 = balanceSection?.querySelector<HTMLElement>("[data-balance-text-2]");

      if (balanceSection && balanceInner && balanceSlider && balanceText1 && balanceText2) {
        // Second text starts hidden
        gsap.set(balanceText2, { autoAlpha: 0, y: 24 });

        const balanceTl = gsap.timeline({
          scrollTrigger: {
            trigger: balanceSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            pin: false,
          },
        });

        // Phase 1 (0–40%): Hold on first text
        // Phase 2 (40–60%): Transition — gradient shifts, toggle slides, text cross-fades
        // Phase 3 (60–100%): Hold on second text

        balanceTl
          // Fade out first text
          .to(balanceText1, { autoAlpha: 0, y: -20, duration: 0.15 }, 0.35)
          // Background transition to dark
          .to(balanceInner, { backgroundColor: "#2e3231", duration: 0.2 }, 0.35)
          // Text color transition (heading + body + toggle label go light)
          .to(balanceInner, { color: "#ffffff", duration: 0.2 }, 0.35)
          // Toggle slider moves right
          .to(balanceSlider, { x: 20, duration: 0.15 }, 0.38)
          // Toggle background brightens
          .to(
            balanceSection.querySelector<HTMLElement>("[data-balance-toggle] > div") ??
              balanceSlider.parentElement!,
            { backgroundColor: "rgba(127, 166, 155, 0.35)", duration: 0.15 },
            0.38,
          )
          // Fade in second text
          .to(balanceText2, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.45);
      }

      // ── General parallax: [data-parallax-speed] ──────────────────────────
      // Any element can opt in with data-parallax-speed="0.15".
      // Positive values move the element upward slower than scroll (depth).
      // Use small values (0.05–0.25) for subtlety.
      gsap.utils.toArray<HTMLElement>("[data-parallax-speed]").forEach((el) => {
        // Skip hero background — handled above
        if (el.hasAttribute("data-hero-primary")) return;

        const speed = parseFloat(el.dataset.parallaxSpeed ?? "0.15");
        const direction = el.dataset.parallaxDir === "down" ? 1 : -1;

        gsap.to(el, {
          yPercent: direction * speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section") ?? el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ── Section image zoom: [data-zoom-scroll] ───────────────────────────
      // Images that should subtly scale up as they come into view.
      gsap.utils.toArray<HTMLElement>("[data-zoom-scroll]").forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 1.0 },
          {
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("section") ?? el.parentElement ?? el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // ── Process: sticky step-by-step replacement ─────────────────────────
      // The .process section has height = N * 100vh (via CSS var --step-count).
      // The .inner is position: sticky so it stays fixed.
      // Steps + big numbers are absolutely stacked; GSAP scrubs them in/out.
      const processSection = document.querySelector<HTMLElement>('[data-section="process"]');
      const processSteps = processSection
        ? Array.from(processSection.querySelectorAll<HTMLElement>("[data-process-step]"))
        : [];
      const processNums = processSection
        ? Array.from(processSection.querySelectorAll<HTMLElement>("[data-process-num]"))
        : [];

      if (processSection && processSteps.length > 1) {
        // All steps + numbers except the first start hidden
        gsap.set(processSteps.slice(1), { autoAlpha: 0, y: 48 });
        gsap.set(processNums.slice(1), { autoAlpha: 0, y: 40 });

        const total = processSteps.length;

        processSteps.forEach((step, i) => {
          if (i === 0) return;
          const prevStep = processSteps[i - 1];
          const prevNum = processNums[i - 1];
          const currNum = processNums[i];

          // Each transition occupies an equal slice of 0–80% scroll range
          const startPct = ((i - 1) / (total - 1)) * 80;
          const endPct = startPct + 80 / (total - 1);
          const midPct = startPct + (endPct - startPct) * 0.35;

          // Fade out previous step
          gsap.to(prevStep, {
            autoAlpha: 0,
            y: -36,
            ease: "power1.in",
            scrollTrigger: {
              trigger: processSection,
              start: `${startPct}% top`,
              end: `${midPct}% top`,
              scrub: 1,
            },
          });

          // Fade out previous number
          if (prevNum) {
            gsap.to(prevNum, {
              autoAlpha: 0,
              y: -30,
              ease: "power1.in",
              scrollTrigger: {
                trigger: processSection,
                start: `${startPct}% top`,
                end: `${midPct}% top`,
                scrub: 1,
              },
            });
          }

          // Fade in current step
          gsap.to(step, {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: processSection,
              start: `${midPct - 5}% top`,
              end: `${endPct - 2}% top`,
              scrub: 1,
            },
          });

          // Fade in current number
          if (currNum) {
            gsap.to(currNum, {
              autoAlpha: 1,
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: processSection,
                start: `${midPct - 5}% top`,
                end: `${endPct - 2}% top`,
                scrub: 1,
              },
            });
          }
        });
      }
    });

    return () => {
      matchMedia.revert();
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
