"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <SectionHeading
                    title="About"
                    subtitle="A bit about who I am and what I do"
                />

                <div ref={ref} className="grid md:grid-cols-[1fr_1fr] gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-5"
                    >
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            I&apos;m a <span className="text-[var(--color-foreground)]">Computer Science student</span> and
                            tech enthusiast with a passion for building end-to-end web applications
                            with optimized backends. I focus on creating digital experiences that are
                            not just functional, but genuinely pleasant to use.
                        </p>
                        <p className="text-[var(--color-muted)] leading-relaxed">
                            My interests span across <span className="text-[var(--color-foreground)]">automation</span>,
                            <span className="text-[var(--color-foreground)]"> cloud deployment</span>, and
                            <span className="text-[var(--color-foreground)]"> AI-powered APIs</span>.
                            I&apos;m always curious about improving user experience through smart,
                            thoughtful design.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-lg p-5 font-mono text-sm"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                        </div>
                        <div className="space-y-1 text-[var(--color-muted)]">
                            <p>
                                <span className="text-[var(--color-accent)]">~</span> whoami
                            </p>
                            <p className="text-[var(--color-foreground)]">
                                → Ishaan Bajpai
                            </p>
                            <p className="mt-3">
                                <span className="text-[var(--color-accent)]">~</span> cat stack.txt
                            </p>
                            <p className="text-[var(--color-foreground)]">
                                → Next.js, TypeScript, Node.js
                            </p>
                            <p className="mt-3">
                                <span className="text-[var(--color-accent)]">~</span> echo $STATUS
                            </p>
                            <p className="text-[var(--color-foreground)]">
                                → Building cool things{" "}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                >
                                    ▌
                                </motion.span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
