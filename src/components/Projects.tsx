"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const projects = [
  {
    title: "College Placement Intelligence Platform",
    description:
      "An agentic RAG system for sensitive placement queries. A LangGraph workflow routes questions between a deterministic PostgreSQL rules engine and FAISS retrieval, with human escalation for low-confidence answers.",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "LangGraph", "FAISS", "Docker"],
    year: "Sep 2026",
  },
  {
    title: "GitHub Issue Spider",
    description:
      "A SaaS platform that automates open-source GitHub issue tracking with real-time Discord alerts, configurable filtering and serverless background processing through GitHub Actions.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "GitHub Actions"],
    year: "Jul 2026",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Projects"
          subtitle="A selection of systems I've built."
        />

        <div ref={ref} className="mt-16 grid gap-5">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 35 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              className="group rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card)] p-6 md:p-8 transition-all duration-300 hover:border-[var(--color-accent)]/30 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4 font-mono text-xs text-[var(--color-muted)]">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{project.year}</span>
              </div>

              <div className="mt-10 flex items-start justify-between gap-6">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold transition-colors group-hover:text-[var(--color-accent)]">
                  {project.title}
                </h3>
                <span className="hidden sm:block text-xl text-[var(--color-muted)] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/Ishaan488"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
          >
            View more on GitHub <span>↗</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
