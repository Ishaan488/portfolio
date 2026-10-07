import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

export default function Experience() {
    return (
        <section id="experience" className="py-24 md:py-32">
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
                <SectionHeader index="02" label="Experience">
                    Where I&apos;ve been <em className="serif">building</em>.
                </SectionHeader>

                <ol>
                    {experience.map((item, i) => (
                        <li key={item.company}>
                            <Reveal delay={i * 0.06}>
                                <article className="group grid gap-x-8 gap-y-3 border-t border-line py-7 md:grid-cols-12 md:py-9">
                                    <div className="label flex gap-3 md:col-span-3 md:flex-col md:gap-2 md:pt-2.5">
                                        <span className={item.current ? "text-accent-text" : undefined}>
                                            {item.period}
                                        </span>
                                        <span aria-hidden className="md:hidden">
                                            &middot;
                                        </span>
                                        <span>{item.location}</span>
                                    </div>

                                    <div className="md:col-span-9">
                                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                                            <h3 className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 ease-out sm:text-3xl md:group-hover:translate-x-2">
                                                {item.company}
                                            </h3>
                                            <p className="shrink-0 text-sm text-muted">{item.role}</p>
                                        </div>
                                        <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                                            {item.summary}
                                        </p>
                                        <p className="label mt-4 leading-relaxed">
                                            {item.stack.join(" · ")}
                                        </p>
                                    </div>
                                </article>
                            </Reveal>
                        </li>
                    ))}
                    <li aria-hidden className="border-t border-line" />
                </ol>
            </div>
        </section>
    );
}
