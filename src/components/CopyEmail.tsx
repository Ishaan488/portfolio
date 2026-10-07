"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/data";
import { Check, Copy } from "./icons";

export default function CopyEmail() {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(site.email);
        } catch {
            // Clipboard can be unavailable (permissions, insecure origin); the address is still visible to select.
            return;
        }
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1800);
    };

    return (
        <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Email address copied" : "Copy email address"}
            className="flex h-9 shrink-0 cursor-pointer items-center gap-2 rounded-full border border-line px-3 text-xs text-muted transition-colors duration-200 hover:border-accent-text hover:text-accent-text"
        >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
    );
}
