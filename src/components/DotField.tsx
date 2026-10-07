"use client";

import { useEffect, useRef } from "react";

const GAP = 30;
const RADIUS = 190;

/**
 * Hero backdrop: a grid of dots with a slow ambient wave. Dots near the
 * pointer swell, tint and push away; when there is no pointer (touch devices,
 * or before the first move) a virtual one drifts around on its own.
 */
export default function DotField() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let width = 0;
        let height = 0;
        let frame = 0;
        let visible = true;
        let base = "236, 235, 228";
        let accent = "200, 245, 66";
        const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: false, placed: false };

        const readColors = () => {
            const styles = getComputedStyle(document.documentElement);
            base = styles.getPropertyValue("--dot-rgb").trim() || base;
            accent = styles.getPropertyValue("--dot-accent-rgb").trim() || accent;
        };

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (now: number) => {
            const time = now * 0.001;
            ctx.clearRect(0, 0, width, height);

            if (!pointer.active) {
                pointer.tx = width * (0.62 + 0.26 * Math.cos(time * 0.32));
                pointer.ty = height * (0.3 + 0.18 * Math.sin(time * 0.47));
            }
            if (!pointer.placed) {
                pointer.x = pointer.tx;
                pointer.y = pointer.ty;
                pointer.placed = true;
            }
            pointer.x += (pointer.tx - pointer.x) * 0.1;
            pointer.y += (pointer.ty - pointer.y) * 0.1;

            const offsetX = (width % GAP) / 2;
            const offsetY = (height % GAP) / 2;

            for (let y = offsetY; y <= height; y += GAP) {
                for (let x = offsetX; x <= width; x += GAP) {
                    const wave = Math.sin(x * 0.011 + y * 0.017 + time * 0.7) * 0.5 + 0.5;
                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const dist = Math.hypot(dx, dy);
                    const near = dist < RADIUS ? (1 - dist / RADIUS) ** 2 : 0;
                    const push = near * 9;
                    const px = dist > 0 ? x + (dx / dist) * push : x;
                    const py = dist > 0 ? y + (dy / dist) * push : y;

                    ctx.fillStyle =
                        near > 0.03
                            ? `rgba(${accent}, ${0.16 + near * 0.6})`
                            : `rgba(${base}, ${0.08 + wave * 0.1})`;
                    ctx.beginPath();
                    ctx.arc(px, py, 1 + wave * 0.4 + near * 2.2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        };

        const loop = (now: number) => {
            draw(now);
            frame = requestAnimationFrame(loop);
        };

        const start = () => {
            cancelAnimationFrame(frame);
            if (reduceMotion) {
                draw(0);
            } else if (visible && !document.hidden) {
                frame = requestAnimationFrame(loop);
            }
        };

        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType !== "mouse") return;
            const rect = canvas.getBoundingClientRect();
            pointer.tx = e.clientX - rect.left;
            pointer.ty = e.clientY - rect.top;
            pointer.active = true;
        };
        const onPointerLeave = () => {
            pointer.active = false;
        };
        const onResize = () => {
            resize();
            start();
        };

        const visibility = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            start();
        });
        const themeObserver = new MutationObserver(() => {
            readColors();
            start();
        });

        readColors();
        resize();
        start();
        visibility.observe(canvas);
        themeObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });
        window.addEventListener("resize", onResize);
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onPointerLeave);
        document.addEventListener("visibilitychange", start);

        return () => {
            cancelAnimationFrame(frame);
            visibility.disconnect();
            themeObserver.disconnect();
            window.removeEventListener("resize", onResize);
            window.removeEventListener("pointermove", onPointerMove);
            document.documentElement.removeEventListener("pointerleave", onPointerLeave);
            document.removeEventListener("visibilitychange", start);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
        />
    );
}
