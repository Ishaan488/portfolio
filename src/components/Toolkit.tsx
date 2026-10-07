"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { toolkit } from "@/lib/data";

export default function Toolkit() {
    const [active, setActive] = useState(0);

    return (
        <div className="flex h-full flex-col">
            <p className="label">Toolkit</p>

            <div role="tablist" aria-label="Skill categories" className="mt-5 flex flex-wrap gap-1">
                {toolkit.map((category, i) => {
                    const selected = i === active;
                    return (
                        <button
                            key={category.title}
                            type="button"
                            role="tab"
                            id={`toolkit-tab-${i}`}
                            aria-selected={selected}
                            aria-controls="toolkit-panel"
                            onClick={() => setActive(i)}
                            className={`relative cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 ${
                                selected ? "text-accent-ink" : "text-muted hover:text-fg"
                            }`}
                        >
                            {selected && (
                                <motion.span
                                    layoutId="toolkit-pill"
                                    className="absolute inset-0 rounded-full bg-accent"
                                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative">{category.title}</span>
                        </button>
                    );
                })}
            </div>

            <div
                id="toolkit-panel"
                role="tabpanel"
                aria-labelledby={`toolkit-tab-${active}`}
                className="mt-7 flex min-h-[6rem] flex-wrap content-start gap-2"
            >
                {toolkit[active].skills.map((skill, i) => (
                    <motion.span
                        key={`${active}-${skill}`}
                        initial={{ opacity: 0, y: 12, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
                        className="rounded-full border border-line bg-bg/50 px-3.5 py-2 text-sm"
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>

            <p className="label mt-auto flex items-center justify-between border-t border-line pt-5">
                <span>{toolkit[active].title}</span>
                <span>
                    {String(active + 1).padStart(2, "0")} / {String(toolkit.length).padStart(2, "0")}
                </span>
            </p>
        </div>
    );
}
