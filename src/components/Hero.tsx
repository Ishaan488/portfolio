"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            {/* Subtle grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--color-muted) 1px, transparent 1px), linear-gradient(90deg, var(--color-muted) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Subtle radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--color-accent)] opacity-[0.04] blur-[120px]" />

            <div className="relative z-10 text-center max-w-3xl">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm tracking-[0.3em] uppercase text-[var(--color-muted)] mb-6"
                >
                    Full-Stack Developer
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="font-[family-name:var(--font-heading)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
                >
                    Ishaan
                    <br />
                    <span className="text-[var(--color-accent)]">Bajpai</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="mt-8 text-[var(--color-muted)] text-base sm:text-lg max-w-xl mx-auto leading-relaxed"
                >
                    Building efficient, scalable, and user-friendly digital experiences
                    with modern web technologies.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mt-10 flex items-center justify-center gap-6"
                >
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-[var(--color-foreground)] text-[var(--color-background)] text-sm font-medium rounded-full hover:bg-[var(--color-accent)] transition-colors duration-300"
                    >
                        View Work
                    </a>
                    <a
                        href="#contact"
                        className="px-6 py-3 border border-[var(--color-card-border)] text-[var(--color-foreground)] text-sm font-medium rounded-full hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300"
                    >
                        Get in Touch
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border border-[var(--color-card-border)] flex items-start justify-center p-1.5"
                >
                    <motion.div className="w-1 h-1.5 rounded-full bg-[var(--color-muted)]" />
                </motion.div>
            </motion.div>
        </section>
    );
}
