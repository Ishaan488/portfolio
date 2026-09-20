"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const experience = [
  {
    company: "Talencia Global",
    role: "Software Trainee",
    period: "Jul 2026 — Present",
    location: "Chennai",
    summary: "Building the RADIX Placement Operations Admin Panel — a full-stack CRM for placement workflows, analytics and AI-assisted recruitment intelligence.",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Redis", "Arq", "LangGraph"],
  },
  {
    company: "Xenkrypt Technologies",
    role: "Software Intern",
    period: "Dec 2025 — Mar 2026",
    location: "Chennai",
    summary: "Built production-ready interfaces with Next.js and Tailwind CSS and designed backend architecture for an encrypted mail service with secure REST APIs.",
    stack: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "REST APIs"],
  },
  {
    company: "Cargo Matters",
    role: "Software Intern",
    period: "Nov 2025 — Jan 2026",
    location: "Remote",
    summary: "Built web automation pipelines for structured data extraction and Chrome extensions for automated lead-generation workflows.",
    stack: ["Node.js", "Puppeteer", "Chrome Extensions"],
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeading title="Experience" subtitle="Where I've been building." />
        <div ref={ref} className="mt-16 border-t border-[var(--color-card-border)]">
          {experience.map((item, index) => (
            <motion.article key={item.company} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.1 }} className="grid md:grid-cols-[150px_1fr] gap-6 py-9 border-b border-[var(--color-card-border)]">
              <div className="font-mono text-xs text-[var(--color-muted)]"><div>{item.period}</div><div className="mt-2">{item.location}</div></div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2"><h3 className="font-heading text-2xl font-semibold">{item.company}</h3><span className="text-sm text-[var(--color-accent)]">{item.role}</span></div>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--color-muted)]">{item.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{item.stack.map((tech) => <span key={tech} className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)]">{tech}</span>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
