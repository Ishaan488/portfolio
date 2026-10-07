"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { toggleTheme, useTheme } from "@/lib/theme";
import { Moon, Sun } from "./icons";

// `sections` lists every section a pill stays lit for; the first is its link target.
const items = [
    { id: "top", label: "Home", sections: ["top"] },
    { id: "about", label: "About", sections: ["about"] },
    { id: "work", label: "Work", sections: ["experience", "work"] },
    { id: "contact", label: "Contact", sections: ["contact"] },
];

export default function Dock() {
    const [active, setActive] = useState("top");
    const theme = useTheme();

    // Scroll spy: whichever section crosses the middle of the viewport is active.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (!entry.isIntersecting) continue;
                    const item = items.find((i) => i.sections.includes(entry.target.id));
                    if (item) setActive(item.id);
                }
            },
            { rootMargin: "-50% 0px -50% 0px" }
        );
        for (const id of items.flatMap((item) => item.sections)) {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        }
        return () => observer.disconnect();
    }, []);

    const onToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    };

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 flex justify-center px-4">
            <motion.nav
                aria-label="Primary"
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, delay: 1, ease: EASE }}
                className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-line bg-surface/75 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl"
            >
                {items.map((item) => {
                    const isActive = active === item.id;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.sections[0]}`}
                            aria-current={isActive ? "true" : undefined}
                            className={`relative rounded-full px-3 py-2 text-[13px] font-medium transition-colors duration-300 sm:px-4 ${
                                isActive ? "text-bg" : "text-muted hover:text-fg"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="dock-pill"
                                    className="absolute inset-0 rounded-full bg-fg"
                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative">{item.label}</span>
                        </a>
                    );
                })}

                <span aria-hidden className="mx-1 h-5 w-px bg-line" />

                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                    className="relative flex h-9 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-full text-muted transition-colors duration-300 hover:bg-surface-2 hover:text-fg"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={theme}
                            initial={{ y: 14, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -14, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.25, ease: EASE }}
                        >
                            {theme === "dark" ? <Sun /> : <Moon />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </motion.nav>
        </div>
    );
}
