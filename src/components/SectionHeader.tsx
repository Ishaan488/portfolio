import Reveal from "./Reveal";

interface Props {
    index: string;
    label: string;
    children: React.ReactNode;
}

export default function SectionHeader({ index, label, children }: Props) {
    return (
        <div className="mb-12 md:mb-16">
            <Reveal>
                <p className="label flex items-center gap-3">
                    <span className="text-accent-text">{index}</span>
                    <span className="h-px w-8 bg-line-strong" />
                    {label}
                </p>
            </Reveal>
            <Reveal delay={0.08}>
                <h2 className="mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.04] tracking-[-0.03em] sm:text-5xl md:text-6xl">
                    {children}
                </h2>
            </Reveal>
        </div>
    );
}
