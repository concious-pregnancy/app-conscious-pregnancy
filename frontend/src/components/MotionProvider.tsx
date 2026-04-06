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
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
        gsap.set(node, { autoAlpha: 0, y: 24 });
        gsap.to(node, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("section[data-section]").forEach((section) => {
        const staggerNodes = section.querySelectorAll<HTMLElement>("[data-stagger]");
        if (staggerNodes.length === 0) return;
        gsap.set(staggerNodes, { autoAlpha: 0, y: 22 });
        gsap.to(staggerNodes, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });

      const heroSection = document.querySelector<HTMLElement>('section[data-section="hero"]');
      const heroBackground = heroSection?.querySelector<HTMLElement>("[data-hero-primary]");

      if (heroSection && heroBackground) {
        gsap.fromTo(
          heroBackground,
          { scale: 1.02 },
          {
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: heroSection,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
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
