"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/lib/data";

const timeFormat = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
});

const dateFormat = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    weekday: "short",
    day: "numeric",
    month: "short",
});

const offsetFormat = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    timeZoneName: "shortOffset",
});

// A one-second clock; 0 on the server so the first client render matches.
const subscribe = (onTick: () => void) => {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
};
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => 0;

const part = (parts: Intl.DateTimeFormatPart[], type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

export default function LocalTime() {
    const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const ready = seconds > 0;
    const date = new Date(seconds * 1000);

    const time = timeFormat.formatToParts(date);
    const hour = ready ? part(time, "hour") : "--";
    const minute = ready ? part(time, "minute") : "--";
    const second = ready ? part(time, "second") : "--";
    const offset = part(offsetFormat.formatToParts(date), "timeZoneName").replace("GMT", "UTC");
    const asleep = ready && Number(hour) < 7;

    return (
        <div className="flex h-full flex-col justify-between gap-8">
            <p className="label">Local time</p>

            <div>
                <p className="flex items-baseline text-6xl font-medium tabular-nums tracking-[-0.04em] sm:text-7xl">
                    <span>{hour}</span>
                    <span className="blink mx-0.5 text-accent-text">:</span>
                    <span>{minute}</span>
                    <span className="ml-2 font-mono text-sm tracking-normal text-muted">{second}</span>
                </p>
                <p className="mt-3 text-sm text-muted">
                    {ready ? dateFormat.format(date) : " "}
                    {ready && ` · ${site.timeZoneLabel} (${offset})`}
                </p>
            </div>

            <p className="flex items-center gap-2.5 text-sm">
                <span
                    className={`h-2 w-2 rounded-full ${asleep ? "bg-line-strong" : "bg-accent-text"}`}
                />
                {asleep ? "Probably asleep" : "Probably at the keyboard"}
            </p>
        </div>
    );
}
