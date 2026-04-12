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
      // Steps are absolutely stacked; GSAP scrubs them in/out one at a time.
      const processSection = document.querySelector<HTMLElement>('[data-section="process"]');
      const processSteps = processSection
        ? Array.from(processSection.querySelectorAll<HTMLElement>("[data-process-step]"))
        : [];

      if (processSection && processSteps.length > 1) {
        // All steps except the first start hidden below
        gsap.set(processSteps.slice(1), { autoAlpha: 0, y: 48 });

        const total = processSteps.length;

        processSteps.forEach((step, i) => {
          if (i === 0) return;
          const prev = processSteps[i - 1];

          // Each transition uses 1/total of the section's scroll height
          const startPct = ((i - 1) / (total - 1)) * 80; // 0%–80%
          const endPct = startPct + 80 / (total - 1);

          // Fade out previous
          gsap.to(prev, {
            autoAlpha: 0,
            y: -36,
            ease: "power1.in",
            scrollTrigger: {
              trigger: processSection,
              start: `${startPct}% top`,
              end: `${startPct + (endPct - startPct) * 0.45}% top`,
              scrub: 1,
            },
          });

          // Fade in current
          gsap.to(step, {
            autoAlpha: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: processSection,
              start: `${startPct + (endPct - startPct) * 0.25}% top`,
              end: `${endPct - 2}% top`,
              scrub: 1,
            },
          });
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
