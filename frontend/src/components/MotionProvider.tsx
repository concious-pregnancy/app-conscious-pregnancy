"use client";

import { useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionProvider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      // ── Lenis smooth scroll, synced to GSAP ticker ──────────────────────
      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        gestureOrientation: "vertical",
        wheelMultiplier: 0.95,
      });

      // Sync Lenis with GSAP ticker (recommended pattern, replaces raf loop)
      const lenisUpdate = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(lenisUpdate);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 768px)", () => {
        // ── data-reveal: simple fade-up on enter ─────────────────────────
        // Skip nodes inside sections that drive their own reveal via [data-is-in].
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((node) => {
          if (node.closest('[data-section="ready"]') || node.closest('[data-section="pricing"]')) {
            return;
          }
          gsap.set(node, { autoAlpha: 0, y: 28 });
          gsap.to(node, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: { trigger: node, start: "top 88%", once: true },
          });
        });

        // ── data-stagger: per-section staggered reveal ────────────────────
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
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          });
        });

        // ── Hero image dissolve: fade photo layer as hero exits ─────────
        // Uses onUpdate (not a tween) to bypass CSS transition conflicts on
        // the .img children. Triggers on the hero section itself so the
        // scroll math is anchored to a known position regardless of Lenis.
        const heroSection = document.querySelector<HTMLElement>('section[data-section="hero"]');
        const heroMedia = heroSection?.querySelector<HTMLElement>("[data-hero-media]");
        if (heroSection && heroMedia) {
          ScrollTrigger.create({
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
              heroMedia.style.opacity = String(1 - self.progress);
            },
            onLeave: () => {
              heroMedia.style.visibility = "hidden";
            },
            onEnterBack: () => {
              heroMedia.style.visibility = "visible";
            },
            onLeaveBack: () => {
              heroMedia.style.opacity = "1";
            },
          });
        }

        // ── General data-parallax-speed ──────────────────────────────────
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

        // ── data-zoom-scroll ─────────────────────────────────────────────
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

        // ── Listen: dome arc flatten ──────────────────────────────────────
        const listenSection = document.querySelector<HTMLElement>('[data-section="listen"]');
        const listenWrap = listenSection?.querySelector<HTMLElement>("[data-listen-wrap]");
        if (listenSection && listenWrap) {
          gsap.fromTo(
            listenWrap,
            { "--arc": 0 },
            {
              "--arc": 1,
              ease: "none",
              scrollTrigger: {
                trigger: listenSection,
                start: "top 80%",
                end: "top top",
                scrub: true,
              },
            },
          );

          // Subtle Ken Burns drift across full section
          const listenImage = listenSection.querySelector<HTMLElement>(`[data-listen-wrap] > div`);
          if (listenImage) {
            gsap.fromTo(
              listenImage,
              { scale: 1.05, yPercent: 0 },
              {
                scale: 1.12,
                yPercent: -3,
                ease: "none",
                scrollTrigger: {
                  trigger: listenSection,
                  start: "top top",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }
        }

        // ── Real Stories: timeline-driven scale/blur on h2, scrubbed ─────
        const rsSection = document.querySelector<HTMLElement>('[data-section="real-stories"]');
        const rsH2 = rsSection?.querySelector<HTMLElement>("[data-real-stories-h2]");
        const rsBody = rsSection?.querySelector<HTMLElement>("[data-real-stories-body]");
        const rsPill = rsSection?.querySelector<HTMLElement>("[data-real-stories-pill]");
        const rsBack = rsSection?.querySelector<HTMLElement>(`section [class*="back"]`);
        const rsFront = rsSection?.querySelector<HTMLElement>(`section [class*="front"]`);

        if (rsSection && rsH2) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: rsSection,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });
          tl.to(rsH2, { scale: 2.2, filter: "blur(12px)", ease: "none" }, 0);
          tl.to(rsH2, { autoAlpha: 0, ease: "power1.in" }, 0.7);
          if (rsBody) tl.to(rsBody, { autoAlpha: 0, ease: "power1.in" }, 0.45);
          if (rsPill) tl.to(rsPill, { autoAlpha: 0, ease: "power1.in" }, 0.45);

          // Subtle parallax on portraits, opposite directions for depth
          if (rsBack) {
            gsap.fromTo(
              rsBack,
              { yPercent: 0 },
              {
                yPercent: -8,
                ease: "none",
                scrollTrigger: {
                  trigger: rsSection,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }
          if (rsFront) {
            gsap.fromTo(
              rsFront,
              { yPercent: 0 },
              {
                yPercent: 4,
                ease: "none",
                scrollTrigger: {
                  trigger: rsSection,
                  start: "top top",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }
        }
      });

      // ── Ready + Pricing: section-level data-is-in toggle on enter ──────
      // Run outside matchMedia so it works on all viewports.
      ["ready", "pricing"].forEach((sectionName) => {
        const sec = document.querySelector<HTMLElement>(`[data-section="${sectionName}"]`);
        if (!sec) return;
        ScrollTrigger.create({
          trigger: sec,
          start: "top 80%",
          onEnter: () => sec.setAttribute("data-is-in", "true"),
          once: true,
        });
      });

      // ── Balance: scroll-driven light/dark swap (mobile + desktop) ──────
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

        ScrollTrigger.create({
          trigger: balanceSection,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            if (userLocked) return;
            setState(self.progress > 0.5 ? "dark" : "light");
          },
        });

        if (balanceToggle) {
          balanceToggle.addEventListener("click", () => {
            const nextDark = balanceStage.getAttribute("data-is-dark") !== "true";
            setState(nextDark ? "dark" : "light");
            userLocked = nextDark ? "dark" : "light";
            if (lockTimer) window.clearTimeout(lockTimer);
            lockTimer = window.setTimeout(() => {
              userLocked = null;
              ScrollTrigger.refresh();
            }, 2500);
          });
        }
      }

      // ── Process: digit-only viewport-height slide, ScrollTrigger + GSAP ──
      // Left column steps scroll naturally. Right sticky panel has a static "0"
      // and an animated digit (1–4) that travels y: ±'100vh' (full viewport),
      // clipped by numPanel (overflow:hidden, height:100vh).
      const processTrack = document.querySelector<HTMLElement>('[data-section="process"]');
      const processDigits = processTrack
        ? Array.from(processTrack.querySelectorAll<HTMLElement>("[data-process-digit]"))
        : [];
      const processDots = processTrack
        ? Array.from(processTrack.querySelectorAll<HTMLElement>("[data-process-progress] > span"))
        : [];

      if (processTrack && processDigits.length > 0) {
        const n = processDigits.length;

        // Initial state: digit 0 centred, rest parked one full viewport below.
        // Colour-matched gradient overlays on numPanel handle the visual fade —
        // no JS opacity needed.
        gsap.set(processDigits[0], { y: 0 });
        processDigits.slice(1).forEach((el) => gsap.set(el, { y: "100vh" }));

        let current = 0;

        const setDigit = (i: number) => {
          if (i === current) return;
          const prev = current;
          const forward = i > prev;
          current = i;

          const dur = 0.57;

          gsap.killTweensOf([processDigits[prev], processDigits[i]]);

          // Outgoing: slides a full viewport height; overlay fades it near the edge
          gsap.to(processDigits[prev], {
            y: forward ? "-100vh" : "100vh",
            duration: dur,
            ease: "power3.out",
          });

          // Incoming: enters from below (or above); overlay fades it in near the edge
          gsap.fromTo(
            processDigits[i],
            { y: forward ? "100vh" : "-100vh" },
            { y: 0, duration: dur, ease: "power3.out" },
          );

          processDots.forEach((d, idx) => {
            d.setAttribute("data-is-on", idx === i ? "true" : "false");
          });
        };

        const stepsParent =
          processTrack.querySelector<HTMLElement>("[data-process-step]")?.parentElement;
        ScrollTrigger.create({
          trigger: stepsParent ?? processTrack,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.max(0, Math.floor(self.progress * n * 0.999)));
            setDigit(idx);
          },
        });
      }

      // ── Philosophy: word-by-word reveal, driven by ScrollTrigger ───────
      const philoSection = document.querySelector<HTMLElement>('[data-section="philosophy"]');
      const philoWords = philoSection
        ? Array.from(philoSection.querySelectorAll<HTMLElement>("[data-philo-word]"))
        : [];

      if (philoSection && philoWords.length > 0) {
        ScrollTrigger.create({
          trigger: philoSection,
          start: "top bottom",
          end: "bottom top",
          onUpdate: () => {
            const vh = window.innerHeight;
            const topEdge = vh * 0.7;
            const botEdge = vh * 0.25;
            philoWords.forEach((s) => {
              const r = s.getBoundingClientRect();
              const mid = r.top + r.height / 2;
              const p = (topEdge - mid) / (topEdge - botEdge);
              s.setAttribute("data-is-lit", p >= 0.5 ? "true" : "false");
            });
          },
        });
      }

      // ── Cleanup hook (returned from useGSAP context) ───────────────────
      return () => {
        gsap.ticker.remove(lenisUpdate);
        lenis.destroy();
        matchMedia.revert();
      };
    },
    { scope: containerRef },
  );

  return <div ref={containerRef} aria-hidden="true" style={{ display: "contents" }} />;
}
