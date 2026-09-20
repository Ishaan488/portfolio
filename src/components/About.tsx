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
          subtitle="A bit about what I build."
        />

        <div
          ref={ref}
          className="mt-16 grid md:grid-cols-[1.15fr_.85fr] gap-12 items-start"
        >
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed"
          >
            I&apos;m a Computer Science student and software engineer focused
            on building full-stack products, AI-native systems and reliable
            backend infrastructure. I enjoy turning complex workflows into
            clear, useful experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card)] p-5 font-mono text-xs text-[var(--color-muted)]"
          >
            <div className="flex gap-2 mb-4">
              <span className="w-3 h-3 rounded-full bg-white" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <p><span className="text-[var(--color-accent)]">~</span> ishaan</p>
            <p className="text-[var(--color-foreground)]">Full-stack / AI systems</p>
            <p className="mt-3"><span className="text-[var(--color-accent)]">~</span> focus</p>
            <p className="text-[var(--color-foreground)]">Agents · RAG · APIs · product</p>
            <p className="mt-3"><span className="text-[var(--color-accent)]">~</span> status</p>
            <p className="text-[var(--color-foreground)]">Building cool things.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
