"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
    children: React.ReactNode;
    strength?: number;
}

/** Pulls its child gently toward the cursor while hovered. */
export default function Magnetic({ children, strength = 0.3 }: Props) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className="inline-block"
            style={{ x: springX, y: springY }}
            onPointerMove={onPointerMove}
            onPointerLeave={reset}
        >
            {children}
        </motion.div>
    );
}
