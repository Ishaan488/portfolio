"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "@/lib/motion";
import { contactTopics, site } from "@/lib/data";
import { ArrowRight, ChevronDown } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";
type Field = "name" | "email" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_MESSAGE = 4000;

const empty = { name: "", email: "", topic: contactTopics[0], message: "", company: "" };

function validate(values: typeof empty): { field: Field; message: string } | null {
    if (!values.name.trim()) return { field: "name", message: "Add your name so I know who's writing." };
    if (!EMAIL_RE.test(values.email.trim()))
        return { field: "email", message: "That email doesn't look right — I need it to reply." };
    if (!values.message.trim()) return { field: "message", message: "Add a short message first." };
    if (values.message.length > MAX_MESSAGE)
        return { field: "message", message: `Please keep it under ${MAX_MESSAGE} characters.` };
    return null;
}

export default function ContactForm() {
    const [values, setValues] = useState(empty);
    const [status, setStatus] = useState<Status>("idle");
    const [error, setError] = useState<{ field?: Field; message: string } | null>(null);

    const set =
        (key: keyof typeof empty) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setValues((prev) => ({ ...prev, [key]: e.target.value }));
            if (error?.field === key) setError(null);
        };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status === "sending") return;

        const invalid = validate(values);
        if (invalid) {
            setError(invalid);
            setStatus("idle");
            e.currentTarget.querySelector<HTMLElement>(`[name="${invalid.field}"]`)?.focus();
            return;
        }

        setError(null);
        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
            if (!res.ok || !data.ok) {
                throw new Error(data.error || "Something went wrong on my end.");
            }
            setStatus("sent");
        } catch (err) {
            setError({
                message: err instanceof Error ? err.message : "Something went wrong on my end.",
            });
            setStatus("error");
        }
    };

    const reset = () => {
        setValues(empty);
        setError(null);
        setStatus("idle");
    };

    const invalid = (field: Field) => (error?.field === field ? true : undefined);

    return (
        <AnimatePresence mode="wait" initial={false}>
            {status === "sent" ? (
                <motion.div
                    key="sent"
                    role="status"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex min-h-[26rem] flex-col items-start justify-center p-6 sm:p-10"
                >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <motion.path
                                d="M5 12.5l4.5 4.5L19 7.5"
                                stroke="currentColor"
                                strokeWidth={2.25}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
                            />
                        </svg>
                    </span>
                    <p className="mt-7 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                        Message <em className="serif">sent</em>.
                    </p>
                    <p className="mt-3 max-w-sm leading-relaxed text-muted">
                        Thanks, {values.name.trim()}. It&apos;s in my inbox now &mdash; I&apos;ll
                        reply to {values.email.trim()}.
                    </p>
                    <button
                        type="button"
                        onClick={reset}
                        className="link-line mt-8 cursor-pointer pb-1 text-sm font-medium"
                    >
                        Send another
                    </button>
                </motion.div>
            ) : (
                <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="p-6 sm:p-10"
                >
                    <p className="text-2xl font-medium leading-[1.85] tracking-[-0.02em] sm:text-[1.7rem]">
                        Hi Ishaan, I&apos;m{" "}
                        <input
                            name="name"
                            aria-label="Your name"
                            placeholder="your name"
                            autoComplete="name"
                            maxLength={80}
                            value={values.name}
                            onChange={set("name")}
                            aria-invalid={invalid("name")}
                            className="blank"
                        />{" "}
                        and I&apos;d like to talk about{" "}
                        <span className="relative inline-block">
                            <select
                                name="topic"
                                aria-label="What you'd like to talk about"
                                value={values.topic}
                                onChange={set("topic")}
                                className="blank"
                            >
                                {contactTopics.map((topic) => (
                                    <option key={topic}>{topic}</option>
                                ))}
                            </select>
                            <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                        </span>
                        . You can reach me at{" "}
                        <input
                            name="email"
                            type="email"
                            inputMode="email"
                            aria-label="Your email"
                            placeholder="your email"
                            autoComplete="email"
                            maxLength={200}
                            value={values.email}
                            onChange={set("email")}
                            aria-invalid={invalid("email")}
                            className="blank blank-wide"
                        />
                        .
                    </p>

                    <label htmlFor="contact-message" className="sr-only">
                        Your message
                    </label>
                    <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        placeholder="A little more detail…"
                        value={values.message}
                        onChange={set("message")}
                        aria-invalid={invalid("message")}
                        className="mt-7 w-full resize-none rounded-2xl border border-line bg-bg/50 p-4 text-base leading-relaxed outline-none transition-colors duration-200 placeholder:text-muted/75 hover:border-line-strong focus-visible:border-accent-text aria-[invalid=true]:border-danger"
                    />

                    {/* Honeypot: hidden from people, tempting for bots. */}
                    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                        <label>
                            Company
                            <input
                                name="company"
                                tabIndex={-1}
                                autoComplete="off"
                                value={values.company}
                                onChange={set("company")}
                            />
                        </label>
                    </div>

                    <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <p role="alert" className="min-h-5 text-sm text-danger">
                            {error?.message}
                            {status === "error" && (
                                <>
                                    {" "}
                                    <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                                        Email me directly
                                    </a>
                                    .
                                </>
                            )}
                        </p>

                        <button
                            type="submit"
                            disabled={status === "sending"}
                            className="group inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-ink transition-transform duration-200 active:scale-95 disabled:cursor-wait disabled:opacity-70"
                        >
                            {status === "sending" ? (
                                <>
                                    Sending
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent-ink/25 border-t-accent-ink" />
                                </>
                            ) : (
                                <>
                                    Send message
                                    <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            )}
        </AnimatePresence>
    );
}
