import { focusAreas } from "@/lib/data";
import Card from "./Card";
import LocalTime from "./LocalTime";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import Terminal from "./Terminal";
import Toolkit from "./Toolkit";

export default function About() {
    return (
        <section id="about" className="py-24 md:py-32">
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
                <SectionHeader index="01" label="About">
                    Complex workflows in. <em className="serif">Clear</em> experiences out.
                </SectionHeader>

                <div className="grid gap-4 md:grid-cols-12">
                    <Reveal className="md:col-span-7">
                        <Card className="flex h-full flex-col justify-between gap-10 p-6 sm:p-8">
                            <div>
                                <p className="label">Who</p>
                                <p className="mt-5 text-2xl font-medium leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
                                    I&apos;m a Computer Science student and software engineer
                                    building full-stack products, AI-native systems and reliable
                                    backend infrastructure.
                                </p>
                                <p className="mt-5 max-w-lg leading-relaxed text-muted">
                                    I enjoy turning complex workflows into clear, useful
                                    experiences.
                                </p>
                            </div>

                            <div>
                                <p className="label">Focus</p>
                                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                                    {focusAreas.map((area) => (
                                        <li key={area} className="flex items-center gap-2.5 text-sm">
                                            <span className="h-1.5 w-1.5 rounded-full bg-accent-text" />
                                            {area}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Card>
                    </Reveal>

                    <Reveal delay={0.08} className="md:col-span-5">
                        <Card className="h-full p-6 sm:p-8">
                            <Toolkit />
                        </Card>
                    </Reveal>

                    <Reveal className="md:col-span-4">
                        <Card className="h-full p-6 sm:p-8">
                            <LocalTime />
                        </Card>
                    </Reveal>

                    <Reveal delay={0.08} className="md:col-span-8">
                        <Card className="h-full">
                            <Terminal />
                        </Card>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
