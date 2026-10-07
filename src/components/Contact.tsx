import { site } from "@/lib/data";
import Card from "./Card";
import ContactForm from "./ContactForm";
import CopyEmail from "./CopyEmail";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { ArrowUpRight, Github, Linkedin, Mail } from "./icons";

const socials = [
    { label: "GitHub", handle: "Ishaan488", href: site.github, icon: <Github /> },
    { label: "LinkedIn", handle: "ishaan-bajpai", href: site.linkedin, icon: <Linkedin /> },
];

export default function Contact() {
    return (
        <section id="contact" className="py-24 md:py-32">
            <div className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-12">
                <SectionHeader index="03" label="Contact">
                    Let&apos;s build something <em className="serif">together</em>.
                </SectionHeader>

                <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5">
                        <Reveal>
                            <p className="max-w-sm text-lg leading-relaxed text-muted">
                                An idea, an opportunity, or just a hello &mdash; fill in the
                                blanks and it lands straight in my inbox.
                            </p>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <ul className="mt-10">
                                <li className="flex items-center gap-4 border-t border-line py-4">
                                    <Mail className="h-4 w-4 shrink-0 text-muted" />
                                    <a
                                        href={`mailto:${site.email}`}
                                        className="link-line min-w-0 flex-1 truncate pb-0.5 text-sm sm:text-base"
                                    >
                                        {site.email}
                                    </a>
                                    <CopyEmail />
                                </li>
                                {socials.map((social) => (
                                    <li key={social.label} className="border-t border-line last:border-b">
                                        <a
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex items-center gap-4 py-4"
                                        >
                                            <span className="shrink-0 text-muted transition-colors duration-300 group-hover:text-accent-text">
                                                {social.icon}
                                            </span>
                                            <span className="flex-1 text-sm sm:text-base">
                                                {social.label}
                                                <span className="ml-2 text-muted">/ {social.handle}</span>
                                            </span>
                                            <ArrowUpRight className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-text" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>

                    <Reveal delay={0.12} className="lg:col-span-7">
                        <Card>
                            <ContactForm />
                        </Card>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
