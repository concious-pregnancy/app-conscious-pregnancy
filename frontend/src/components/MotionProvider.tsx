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

    // Raw scroll listeners we register manually (so we can clean up)
    const rawListeners: Array<() => void> = [];
    const onRaw = (fn: () => void) => {
      window.addEventListener("scroll", fn, { passive: true });
      window.addEventListener("resize", fn);
      rawListeners.push(() => {
        window.removeEventListener("scroll", fn);
        window.removeEventListener("resize", fn);
      });
      fn();
    };

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

      // ── Hero parallax ────────────────────────────────────────────────────
      const heroSection = document.querySelector<HTMLElement>('section[data-section="hero"]');
      const heroBackground = heroSection?.querySelector<HTMLElement>("[data-hero-primary]");

      if (heroSection && heroBackground) {
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

      // ── General parallax ─────────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-parallax-speed]").forEach((el) => {
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

      // ── Zoom on scroll ───────────────────────────────────────────────────
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
    });

    // ── Balance: scroll-driven light/dark swap ─────────────────────────────
    const balanceSection = document.querySelector<HTMLElement>('[data-section="balance"]');
    const balanceStage = balanceSection?.querySelector<HTMLElement>("[data-balance-stage]");
    const balancePanels = balanceSection
      ? Array.from(balanceSection.querySelectorAll<HTMLElement>("[data-balance-panel]"))
      : [];
    const balanceToggle = balanceSection?.querySelector<HTMLElement>("[data-balance-toggle]");

    if (balanceSection && balanceStage && balancePanels.length > 0) {
      let userLocked: "light" | "dark" | null = null;
      let lockTimer: number | null = null;

      const setState = (state: "light" | "dark") => {
        balanceStage.setAttribute("data-is-dark", state === "dark" ? "true" : "false");
        balancePanels.forEach((p) => {
          const active = p.getAttribute("data-balance-panel") === state;
          p.setAttribute("data-is-active", active ? "true" : "false");
        });
      };

      setState("light");

      const onBalanceScroll = () => {
        if (userLocked) return;
        const r = balanceSection.getBoundingClientRect();
        const total = balanceSection.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, Math.min(total, -r.top));
        const progress = total > 0 ? scrolled / total : 0;
        setState(progress > 0.5 ? "dark" : "light");
      };

      if (balanceToggle) {
        balanceToggle.addEventListener("click", () => {
          const nextDark = balanceStage.getAttribute("data-is-dark") !== "true";
          setState(nextDark ? "dark" : "light");
          userLocked = nextDark ? "dark" : "light";
          if (lockTimer) window.clearTimeout(lockTimer);
          lockTimer = window.setTimeout(() => {
            userLocked = null;
            onBalanceScroll();
          }, 2500);
        });
      }

      onRaw(onBalanceScroll);
    }

    // ── Process: pinned scrubber for 4 steps ───────────────────────────────
    const processTrack = document.querySelector<HTMLElement>('[data-section="process"]');
    const processSlides = processTrack
      ? Array.from(processTrack.querySelectorAll<HTMLElement>("[data-process-slide]"))
      : [];
    const processDots = processTrack
      ? Array.from(processTrack.querySelectorAll<HTMLElement>("[data-process-progress] > span"))
      : [];
    const processPath = processTrack?.querySelector<SVGPathElement>("[data-process-curve]");

    if (processTrack && processSlides.length > 0) {
      let pathLen = 0;
      if (processPath) {
        pathLen = processPath.getTotalLength();
        processPath.style.strokeDasharray = String(pathLen);
        processPath.style.strokeDashoffset = String(pathLen);
      }

      const n = processSlides.length;
      let current = -1;

      const setActive = (i: number) => {
        if (i === current) return;
        current = i;
        processSlides.forEach((s, idx) => {
          s.setAttribute("data-is-active", idx === i ? "true" : "false");
          s.setAttribute("data-is-exiting", idx < i ? "true" : "false");
        });
        processDots.forEach((d, idx) => {
          d.setAttribute("data-is-on", idx === i ? "true" : "false");
        });
      };

      const onProcessScroll = () => {
        const r = processTrack.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = processTrack.offsetHeight - vh;
        const scrolled = Math.max(0, Math.min(total, -r.top));
        const p = total > 0 ? scrolled / total : 0;

        const idx = Math.min(n - 1, Math.max(0, Math.floor(p * n * 0.999)));
        setActive(idx);

        if (processPath) {
          processPath.style.strokeDashoffset = String(pathLen * (1 - p));
        }
      };

      onRaw(onProcessScroll);
    }

    // ── Philosophy: word-by-word scroll reveal ─────────────────────────────
    const philoWords = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section="philosophy"] [data-philo-word]'),
    );

    if (philoWords.length > 0) {
      const onPhiloScroll = () => {
        const vh = window.innerHeight;
        const topEdge = vh * 0.7;
        const botEdge = vh * 0.25;
        philoWords.forEach((s) => {
          const r = s.getBoundingClientRect();
          const mid = r.top + r.height / 2;
          const p = (topEdge - mid) / (topEdge - botEdge);
          s.setAttribute("data-is-lit", p >= 0.5 ? "true" : "false");
        });
      };
      onRaw(onPhiloScroll);
    }

    return () => {
      matchMedia.revert();
      rawListeners.forEach((off) => off());
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
