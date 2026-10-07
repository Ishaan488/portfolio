"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

interface Props {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    y?: number;
}

export default function Reveal({ children, className, delay = 0, y = 28 }: Props) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay, ease: EASE }}
        >
            {children}
        </motion.div>
    );
}
