"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { focusAreas, projects, site, toolkit } from "@/lib/data";
import { toggleTheme } from "@/lib/theme";

type Line = { id: number; kind: "in" | "out"; content: React.ReactNode };

const SUGGESTIONS = ["whoami", "stack", "projects", "contact"];

const link = "text-accent-text underline decoration-dotted underline-offset-4";

function respond(command: string): React.ReactNode {
    if (command.startsWith("sudo")) {
        return "Permission denied — but I like the confidence.";
    }

    switch (command) {
        case "help":
            return (
                <>
                    Available commands:
                    <br />
                    whoami · about · stack · projects · contact · github · linkedin · theme · clear
                </>
            );
        case "whoami":
            return `${site.name} — full-stack developer and Computer Science student.`;
        case "about":
            return `I build end-to-end web apps with optimized backends. Into ${focusAreas
                .join(", ")
                .toLowerCase()}.`;
        case "stack":
            return (
                <>
                    {toolkit.map((category) => (
                        <span key={category.title} className="block">
                            <span className="text-muted">{category.title.toLowerCase()}:</span>{" "}
                            {category.skills.join(", ")}
                        </span>
                    ))}
                </>
            );
        case "projects":
            return (
                <>
                    {projects.map((project) => (
                        <span key={project.title} className="block">
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className={link}>
                                {project.title}
                            </a>{" "}
                            <span className="text-muted">— {project.kind.toLowerCase()}</span>
                        </span>
                    ))}
                </>
            );
        case "contact":
            return (
                <>
                    <a href={`mailto:${site.email}`} className={link}>
                        {site.email}
                    </a>
                    <br />
                    or{" "}
                    <a href="#contact" className={link}>
                        jump to the form
                    </a>
                    .
                </>
            );
        case "github":
            return (
                <a href={site.github} target="_blank" rel="noopener noreferrer" className={link}>
                    {site.github.replace("https://", "")}
                </a>
            );
        case "linkedin":
            return (
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                    {site.linkedin.replace("https://", "")}
                </a>
            );
        case "theme":
            return `Switched to the ${toggleTheme()} theme.`;
        default:
            return `command not found: ${command} — try "help".`;
    }
}

const INITIAL: Line[] = [
    { id: 0, kind: "in", content: "whoami" },
    { id: 1, kind: "out", content: respond("whoami") },
    { id: 2, kind: "out", content: 'Type "help", or tap a command below.' },
];

export default function Terminal() {
    const [lines, setLines] = useState<Line[]>(INITIAL);
    const [value, setValue] = useState("");
    const nextId = useRef(INITIAL.length);
    const scroller = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = scroller.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [lines]);

    const execute = (raw: string) => {
        const input = raw.trim();
        if (!input) return;
        const command = input.toLowerCase();

        if (command === "clear") {
            setLines([]);
            return;
        }

        const id = nextId.current;
        nextId.current += 2;
        const output = respond(command);
        setLines((prev) => [
            ...prev,
            { id, kind: "in", content: input },
            { id: id + 1, kind: "out", content: output },
        ]);
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        execute(value);
        setValue("");
    };

    return (
        <div className="flex h-full flex-col font-mono text-[13px] leading-relaxed">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-6">
                <div className="flex items-center gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                    <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-text" />
                </div>
                <p className="label">ishaan — zsh</p>
            </div>

            <div
                ref={scroller}
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
                className="h-44 space-y-1.5 overflow-y-auto px-5 py-4 sm:px-6"
            >
                {lines.map((line) => (
                    <motion.div
                        key={line.id}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className={line.kind === "in" ? "text-fg" : "break-words pb-1.5 text-fg/80"}
                    >
                        {line.kind === "in" && <span className="mr-2 text-accent-text">❯</span>}
                        {line.content}
                    </motion.div>
                ))}
            </div>

            <div className="mt-auto border-t border-line px-5 py-3.5 sm:px-6">
                <form onSubmit={onSubmit} className="flex items-center gap-2">
                    <label htmlFor="terminal-input" className="text-accent-text">
                        <span className="sr-only">Terminal command</span>
                        <span aria-hidden>❯</span>
                    </label>
                    <input
                        id="terminal-input"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="type a command…"
                        autoComplete="off"
                        autoCapitalize="none"
                        autoCorrect="off"
                        spellCheck={false}
                        className="w-full bg-transparent text-base outline-none placeholder:text-muted/70 sm:text-[13px]"
                    />
                </form>

                <div className="mt-3 flex flex-wrap gap-1.5">
                    {SUGGESTIONS.map((command) => (
                        <button
                            key={command}
                            type="button"
                            onClick={() => execute(command)}
                            className="cursor-pointer rounded-full border border-line px-2.5 py-1 text-xs text-muted transition-colors duration-200 hover:border-accent-text hover:text-accent-text"
                        >
                            {command}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
