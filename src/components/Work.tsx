"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { projects, site } from "@/lib/data";
import Card from "./Card";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight } from "./icons";

const pad = (n: number) => String(n + 1).padStart(2, "0");

export default function Work() {
    const [active, setActive] = useState(0);
    const current = projects[active];

    return (
        <section id="work" className="py-24 md:py-32">
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
                <SectionHeader index="02" label="Work">
                    A few things I&apos;ve <em className="serif">built</em>.
                </SectionHeader>

                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    {/* Index: every row links to the repo; on large screens it also drives the preview. */}
                    <ol className="lg:col-span-7">
                        {projects.map((project, i) => {
                            const isActive = i === active;
                            return (
                                <li key={project.title}>
                                    <Reveal delay={i * 0.06}>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={() => setActive(i)}
                                            onFocus={() => setActive(i)}
                                            className={`group relative block border-t border-line py-6 transition-opacity duration-500 lg:py-7 ${
                                                isActive ? "" : "lg:opacity-40"
                                            }`}
                                        >
                                            <span
                                                aria-hidden
                                                className={`absolute inset-x-0 -top-px hidden h-px origin-left bg-accent-text transition-transform duration-700 ease-out lg:block ${
                                                    isActive ? "scale-x-100" : "scale-x-0"
                                                }`}
                                            />
                                            <span className="flex items-baseline gap-5">
                                                <span className="label w-6 shrink-0">{pad(i)}</span>
                                                <span className="flex-1 text-3xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-out sm:text-4xl lg:text-[2.75rem] lg:leading-none lg:group-hover:translate-x-2">
                                                    {project.title}
                                                </span>
                                                <ArrowUpRight className="h-5 w-5 shrink-0 self-center text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" />
                                            </span>

                                            {/* Details live in the preview panel on large screens. */}
                                            <span className="mt-3 block pl-11 lg:hidden">
                                                <span className="block leading-relaxed text-muted">
                                                    {project.description}
                                                </span>
                                                <span className="label mt-3 block">
                                                    {project.tags.join(" · ")}
                                                </span>
                                            </span>
                                        </a>
                                    </Reveal>
                                </li>
                            );
                        })}
                        <li aria-hidden className="border-t border-line" />
                    </ol>

                    <Reveal delay={0.15} className="hidden lg:col-span-5 lg:block">
                        <Card className="h-full min-h-[24rem] p-8">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.35, ease: EASE }}
                                    className="flex h-full flex-col"
                                >
                                    <div className="flex items-start justify-between">
                                        <p className="label">{current.kind}</p>
                                        <p className="serif text-7xl leading-none">{pad(active)}</p>
                                    </div>

                                    <p className="mt-auto pt-10 text-xl leading-relaxed tracking-[-0.01em]">
                                        {current.description}
                                    </p>

                                    <ul className="mt-6 flex flex-wrap gap-2">
                                        {current.tags.map((tag) => (
                                            <li
                                                key={tag}
                                                className="rounded-full border border-line px-3 py-1.5 text-xs text-muted"
                                            >
                                                {tag}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </Card>
                    </Reveal>
                </div>

                <Reveal className="mt-10">
                    <a
                        href={site.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line inline-flex items-center gap-2 pb-1 text-sm font-medium"
                    >
                        Everything else is on GitHub
                        <ArrowUpRight />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
