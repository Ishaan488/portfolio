"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

const categories = [
    {
        title: "Frontend",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "EJS"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Multer"],
    },
    {
        title: "Database & Cloud",
        skills: ["MongoDB", "Cloudinary", "Google Drive API", "MongoDB Atlas"],
    },
    {
        title: "Tools & Other",
        skills: ["Git & GitHub", "Chrome Extensions", "Gemini API", "Webpack", "CLI Scripting"],
    },
];

export default function TechStack() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="py-32 px-6">
            <div className="max-w-4xl mx-auto">
                <SectionHeading
                    title="Skills"
                    subtitle="Technologies and tools I work with"
                />

                <div ref={ref} className="grid sm:grid-cols-2 gap-8">
                    {categories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * catIdx }}
                            className="space-y-4"
                        >
                            <h3 className="font-[family-name:var(--font-heading)] text-sm font-semibold tracking-wide uppercase text-[var(--color-accent)]">
                                {cat.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-xs font-medium text-[var(--color-muted)] bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-full hover:text-[var(--color-foreground)] hover:border-[var(--color-accent)]/30 transition-all duration-200 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
