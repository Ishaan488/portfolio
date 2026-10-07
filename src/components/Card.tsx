"use client";

interface Props {
    children: React.ReactNode;
    className?: string;
}

/** Surface card with a soft spotlight that follows the pointer. */
export default function Card({ children, className = "" }: Props) {
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <div onPointerMove={onPointerMove} className={`card ${className}`}>
            {children}
        </div>
    );
}
