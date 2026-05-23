"use client";

import { useEffect, useState } from "react";
import styles from "./ModeToggle.module.css";

type Mode = "yang" | "yin";

const STORAGE_KEY = "cp-mode";

/**
 * Site-wide light/dark mode toggle, framed as yang (light, default) and
 * yin (dark). Sets data-mode on <html>; CSS in globals.css remaps the
 * semantic tokens off that attribute.
 *
 * Initial value is read from <html data-mode> which is set by a blocking
 * script in layout.tsx before paint, so there is no FOUC.
 */
export default function ModeToggle() {
  const [mode, setMode] = useState<Mode>("yang");

  useEffect(() => {
    const initial = (document.documentElement.dataset.mode as Mode) || "yang";
    setMode(initial);

    // Defer enabling transitions to the next frame so the initial paint
    // doesn't animate from yang to yin (or vice versa).
    requestAnimationFrame(() => {
      document.documentElement.classList.add("mode-transitions-ready");
    });
  }, []);

  const toggle = (next: Mode) => {
    setMode(next);
    document.documentElement.dataset.mode = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage may be blocked (private mode); fail silently.
    }
  };

  return (
    <div className={styles.toggle} role="group" aria-label="Light or dark mode">
      <button
        type="button"
        className={`${styles.option} ${mode === "yang" ? styles.active : ""}`}
        aria-pressed={mode === "yang"}
        aria-label="Yang, light mode"
        onClick={() => toggle("yang")}
      >
        Yang
      </button>
      <button
        type="button"
        className={`${styles.option} ${mode === "yin" ? styles.active : ""}`}
        aria-pressed={mode === "yin"}
        aria-label="Yin, dark mode"
        onClick={() => toggle("yin")}
      >
        Yin
      </button>
    </div>
  );
}
