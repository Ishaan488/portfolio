"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="absolute inset-x-0 top-0 z-20"
        >
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
                <a
                    href="#top"
                    aria-label="Ishaan Bajpai — back to top"
                    className="text-lg font-semibold tracking-tight"
                >
                    ishaan<span className="text-accent-text">.</span>
                </a>

                <a
                    href="#contact"
                    className="group flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-2 backdrop-blur-md transition-colors duration-300 hover:border-line-strong"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-accent-text opacity-60 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-text" />
                    </span>
                    <span className="label !text-fg">Open to connect</span>
                </a>
            </div>
        </motion.header>
    );
}
