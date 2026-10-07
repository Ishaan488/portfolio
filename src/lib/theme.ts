"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getSnapshot = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

const getServerSnapshot = (): Theme => "dark";

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Flips the theme. When an origin is given (and the browser supports view
 * transitions) the new theme is revealed as a circle growing from that point.
 */
export function toggleTheme(origin?: { x: number; y: number }): Theme {
  const root = document.documentElement;
  const next: Theme = getSnapshot() === "dark" ? "light" : "dark";

  const apply = () => {
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  };

  const doc = document as Document & {
    startViewTransition?: (callback: () => void) => unknown;
  };
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!origin || reduceMotion || typeof doc.startViewTransition !== "function") {
    apply();
    return next;
  }

  root.style.setProperty("--vt-x", `${origin.x}px`);
  root.style.setProperty("--vt-y", `${origin.y}px`);
  doc.startViewTransition(apply);
  return next;
}
