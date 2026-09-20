"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const projects = [
    {
        title: "Holo Hubble",
        description:
            "A smart ChatGPT research toolbar — adds navigation, Gemini-powered analysis, and one-click exports to your AI conversations.",
        tags: ["Chrome Extension", "JavaScript", "Gemini API"],
        github: "https://github.com/Ishaan488/holo-hubble",
    },
    {
        title: "Leet Rev",
        description:
            "Browser extension to record LeetCode problem notes with titles and solutions for quick review by competitive programmers.",
        tags: ["Chrome Extension", "Webpack", "Gemini API"],
        github: "https://github.com/Ishaan488/leet-rev",
    },
    {
        title: "Carbon Ease",
        description:
            "A carbon footprint calculator with personalized suggestions to reduce your environmental impact.",
        tags: ["JavaScript", "Frontend", "CSS"],
        github: "https://github.com/Ishaan488/Carbon-Ease",
    },
    {
        title: "Image Caption Generator",
        description:
            "Web app that uses Google Gemini API to generate intelligent captions for uploaded images.",
        tags: ["Node.js", "Express", "Gemini API"],
        github: "https://github.com/Ishaan488/Image-Caption-Generator",
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
                    subtitle="A selection of things I've built"
                />

                <div ref={ref} className="grid md:grid-cols-2 gap-5">
                    {projects.map((project, i) => (
                        <motion.a
                            key={project.title}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * i }}
                            className="group block p-6 bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-card-hover)] transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                                    {project.title}
                                </h3>
                                <svg
                                    className="w-4 h-4 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 flex-shrink-0 mt-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 17L17 7M17 7H7M17 7v10"
                                    />
                                </svg>
                            </div>
                            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-10 text-center"
                >
                    <a
                        href="https://github.com/Ishaan488"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                    >
                        View all projects on GitHub
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
