"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import DotField from "./DotField";
import Magnetic from "./Magnetic";
import { ArrowRight } from "./icons";

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
});

const rise = (delay: number) => ({
    initial: { y: "115%" },
    animate: { y: 0 },
    transition: { duration: 1.1, delay, ease: EASE },
});

// Clips the rising line; the padding keeps descenders and italic overhang visible.
const mask = "block overflow-hidden pb-[0.16em] -mb-[0.16em] pr-[0.08em]";

export default function Hero() {
    return (
        <section
            id="top"
            className="relative flex min-h-svh flex-col justify-end overflow-hidden pb-28 pt-28 md:pb-32"
        >
            <DotField />

            <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
                <motion.p {...fadeUp(0.2)} className="label flex items-center gap-3">
                    <span className="h-px w-8 bg-line-strong" />
                    Full-stack developer &middot; CS student
                </motion.p>

                <h1 className="mt-6 text-[clamp(4rem,15.5vw,13.5rem)] font-semibold leading-[0.86] tracking-[-0.045em]">
                    <span className={mask}>
                        <motion.span {...rise(0.3)} className="block">
                            Ishaan
                        </motion.span>
                    </span>
                    <span className={`${mask} ml-[0.55em]`}>
                        <motion.span {...rise(0.42)} className="serif block text-[1.06em] !tracking-[-0.02em]">
                            Bajpai
                        </motion.span>
                    </span>
                </h1>

                <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
                    <motion.p
                        {...fadeUp(0.75)}
                        className="max-w-md text-lg leading-relaxed text-muted"
                    >
                        I build efficient, scalable web apps that feel good to use &mdash; with a
                        soft spot for <span className="text-fg">automation</span>,{" "}
                        <span className="text-fg">browser extensions</span> and{" "}
                        <span className="text-fg">AI-powered APIs</span>.
                    </motion.p>

                    <motion.div {...fadeUp(0.9)} className="flex items-center gap-7">
                        <Magnetic>
                            <a
                                href="#contact"
                                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-transform duration-200 active:scale-95"
                            >
                                Let&apos;s talk
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                            </a>
                        </Magnetic>
                        <a href="#work" className="link-line pb-1 text-sm font-medium">
                            See my work
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
