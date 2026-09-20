"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const projects = [
  {
    number: "01",
    eyebrow: "AI SYSTEMS",
    title: "OnesingX",
    statement: "Research that moves from question to answer without losing the trail.",
    detail: "Agentic research pipeline",
    tags: ["AGENTS", "RAG", "LANGGRAPH"],
    kind: "research",
  },
  {
    number: "02",
    eyebrow: "FULL-STACK",
    title: "Student Helpdesk",
    statement: "A campus support experience designed to make the right answer feel immediate.",
    detail: "Student support platform",
    tags: ["NEXT.JS", "NODE", "POSTGRES"],
    kind: "helpdesk",
  },
  {
    number: "03",
    eyebrow: "KNOWLEDGE SYSTEM",
    title: "Placement Intelligence",
    statement: "A connected layer for companies, skills, eligibility and outcomes.",
    detail: "Grounded placement intelligence",
    tags: ["RAG", "NEO4J", "MCP"],
    kind: "graph",
  },
];

function Arrow({ className = "" }: { className?: string }) {
  return <span className={className}>↗</span>;
}

function ProjectVisual({ kind }: { kind: string }) {
  if (kind === "research") {
    return (
      <div className="visual visual-dark">
        <div className="visual-topline">
          <span>ONESINGX</span>
          <span>RESEARCH / 01</span>
        </div>
        <div className="research-query">Compare approaches to agent memory</div>
        <div className="pipeline">
          {["QUERY", "SEARCH", "SYNTHESIS", "ANSWER"].map((item, index) => (
            <div className="pipeline-node" key={item}>
              <span className={index === 3 ? "node-dot active" : "node-dot"} />
              <span>{item}</span>
              {index < 3 && <i />}
            </div>
          ))}
        </div>
        <div className="trace-card">
          <span>TRACEABLE OUTPUT</span>
          <strong>Sources → reasoning → result</strong>
          <small>agent orchestration / retrieval / synthesis</small>
        </div>
        <div className="visual-corner">01 / AI</div>
      </div>
    );
  }

  if (kind === "helpdesk") {
    return (
      <div className="visual visual-light">
        <div className="help-window">
          <div className="window-bar">
            <span>STUDENT HELPDESK</span>
            <span>●</span>
          </div>
          <div className="help-body">
            <p className="help-kicker">ASK ANYTHING</p>
            <h4>How can I help?</h4>
            <div className="search-field">
              <span>Ask about campus, courses or policies</span>
              <b>↵</b>
            </div>
            <div className="answer-grid">
              <div className="answer-tile dark-tile">
                <span>01</span>
                <strong>Registration</strong>
                <small>Grounded answer</small>
              </div>
              <div className="answer-tile">
                <span>02</span>
                <strong>Policies</strong>
                <small>Relevant context</small>
              </div>
              <div className="answer-tile">
                <span>03</span>
                <strong>Placements</strong>
                <small>Source aware</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="visual visual-dark graph-visual">
      <div className="graph-copy">
        <span>PLACEMENT INTELLIGENCE</span>
        <strong>Connect the dots.</strong>
        <small>companies / skills / eligibility / outcomes</small>
      </div>
      <div className="graph">
        <span className="graph-line l1" />
        <span className="graph-line l2" />
        <span className="graph-line l3" />
        <span className="graph-line l4" />
        <div className="graph-node n1"><b>COMPANY</b></div>
        <div className="graph-node n2"><b>SKILL</b></div>
        <div className="graph-node n3"><b>STUDENT</b></div>
        <div className="graph-node n4"><b>ROLE</b></div>
        <div className="graph-node n5"><b>DATA</b></div>
      </div>
    </div>
  );
}

function Project({ project, index }: { project: typeof projects[number]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      className="project"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay: index * 0.05 }}
    >
      <div className="project-meta">
        <span className="project-number">{project.number}</span>
        <span>{project.eyebrow}</span>
        <span className="project-type">{project.detail}</span>
      </div>

      <div className="project-stage">
        <ProjectVisual kind={project.kind} />
        <motion.div
          className="project-hover"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <span>EXPLORE</span>
          <Arrow />
        </motion.div>
      </div>

      <div className="project-copy">
        <div>
          <h3>{project.title}</h3>
          <p>{project.statement}</p>
        </div>
        <div className="project-tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
      </div>
    </motion.article>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });
  const orbY = useTransform(smoothProgress, [0, 0.35], [0, 180]);

  return (
    <main>
      <header className="nav">
        <a href="#top" className="brand" aria-label="Ishaan Bajpai home">
          <span>ISHAAN</span><em>BAJPAI</em>
        </a>
        <nav>
          <a href="#work">Work</a>
          <a href="#thinking">Thinking</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-availability" href="#contact">
          <span /> Available
        </a>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <motion.div className="hero-orb" style={{ y: orbY }} />
        <div className="hero-index">01 — PORTFOLIO / 2026</div>
        <div className="hero-main">
          <p className="eyebrow">SOFTWARE ENGINEER · AI SYSTEMS · CHENNAI</p>
          <h1>
            I make
            <span>complex</span>
            <span>things feel</span>
            <span className="accent-word">simple.</span>
          </h1>
          <div className="hero-bottom">
            <p>
              Full-stack engineer building AI-native products,
              <br className="desktop" /> agentic systems and thoughtful interfaces.
            </p>
            <a href="#work" className="scroll-cue">
              <span>SCROLL TO EXPLORE</span>
              <i>↓</i>
            </a>
          </div>
        </div>
        <div className="hero-side-note">BUILD / LEARN / ITERATE</div>
      </section>

      <section className="statement">
        <div className="section-label">01 / THE APPROACH</div>
        <div className="statement-grid">
          <p className="statement-large">
            I like deep systems
            <br /> with a quiet surface.
          </p>
          <p className="statement-small">
            The engineering can be complicated.
            <br />
            The experience shouldn&apos;t have to be.
          </p>
        </div>
      </section>

      <section className="work" id="work">
        <div className="work-header">
          <div>
            <span className="section-label">02 / SELECTED WORK</span>
            <h2>Things I&apos;ve built.</h2>
          </div>
          <span className="work-count">03 PROJECTS</span>
        </div>
        {projects.map((project, index) => (
          <Project key={project.title} project={project} index={index} />
        ))}
      </section>

      <section className="thinking" id="thinking">
        <div className="section-label">03 / CURRENT CURIOSITIES</div>
        <div className="thinking-head">
          <h2>What I&apos;m<br /><em>exploring.</em></h2>
          <p>Not a skills list. Just the questions I keep coming back to.</p>
        </div>
        <div className="curiosity-list">
          {[
            ["01", "AGENTIC SYSTEMS", "How do we make agents useful without making the interface feel robotic?"],
            ["02", "KNOWLEDGE GRAPHS", "How can relationships become a first-class part of product intelligence?"],
            ["03", "INTERFACES", "How much complexity can disappear when interaction is designed properly?"],
          ].map(([number, title, copy]) => (
            <motion.div
              className="curiosity"
              key={number}
              whileHover={{ x: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{copy}</p>
              <Arrow />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="about-strip">
        <div className="section-label">04 / A LITTLE MORE</div>
        <div className="about-grid">
          <h2>The goal is simple:<br /><em>make good software.</em></h2>
          <div>
            <p>
              I&apos;m interested in the space where strong engineering,
              AI systems and product design meet.
            </p>
            <a href="#contact">More about me <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-top">
          <span className="section-label">05 / CONTACT</span>
          <span>CHENNAI · INDIA</span>
        </div>
        <h2>
          Have a hard
          <br />
          <em>problem?</em>
        </h2>
        <div className="contact-bottom">
          <p>Let&apos;s make it simple.</p>
          <div className="contact-links">
            <a href="mailto:ishaanbajpai732004@gmail.com">Email <Arrow /></a>
            <a href="https://github.com/Ishaan488" target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          </div>
        </div>
      </section>

      <footer>
        <span>ISHAAN BAJPAI</span>
        <span>© 2026</span>
        <span>BUILT WITH NEXT.JS</span>
      </footer>
    </main>
  );
}
