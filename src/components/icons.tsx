type IconProps = { className?: string };

const stroke = {
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

export function ArrowUpRight({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <path d="M7 17L17 7M8 7h9v9" />
        </svg>
    );
}

export function ArrowRight({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <path d="M4 12h16m-6-6l6 6-6 6" />
        </svg>
    );
}

export function ChevronDown({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}

export function Sun({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4l1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
    );
}

export function Moon({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <path d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z" />
        </svg>
    );
}

export function Copy({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 012-2h9" />
        </svg>
    );
}

export function Check({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
    );
}

export function Mail({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} {...stroke}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3.5 7l8.5 6 8.5-6" />
        </svg>
    );
}

export function Github({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}

export function Linkedin({ className = "w-4 h-4" }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}
