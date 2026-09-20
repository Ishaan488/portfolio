"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Props {
    title: string;
    subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="mb-16">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl font-bold tracking-tight"
            >
                {title}
                <span className="text-[var(--color-accent)]">.</span>
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="mt-3 text-[var(--color-muted)] text-base max-w-lg"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}
