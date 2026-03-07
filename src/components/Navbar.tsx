"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#1e1e1e]"
                    : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <a
                    href="#"
                    className="font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight text-[var(--color-foreground)] hover:text-[var(--color-accent)] transition-colors"
                >
                    IB.
                </a>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex flex-col gap-1.5 p-2"
                    aria-label="Toggle menu"
                >
                    <motion.span
                        animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                        className="block w-5 h-[1.5px] bg-[var(--color-foreground)]"
                    />
                    <motion.span
                        animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                        className="block w-5 h-[1.5px] bg-[var(--color-foreground)]"
                    />
                    <motion.span
                        animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                        className="block w-5 h-[1.5px] bg-[var(--color-foreground)]"
                    />
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1e1e1e] overflow-hidden"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
