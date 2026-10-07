export const site = {
  name: "Ishaan Bajpai",
  role: "Full-stack developer",
  email: "ishaanbajpai732004@gmail.com",
  github: "https://github.com/Ishaan488",
  linkedin: "https://linkedin.com/in/ishaan-bajpai-201143289",
  // Used by the "Local time" card.
  timeZone: "Asia/Kolkata",
  timeZoneLabel: "IST",
};

export const focusAreas = ["Agents", "RAG", "APIs", "Product"];

export const experience = [
  {
    company: "Talencia Global",
    role: "Software Trainee",
    period: "Jul 2026 — Present",
    current: true,
    location: "Chennai",
    summary:
      "Building the RADIX Placement Operations Admin Panel — a full-stack CRM for placement workflows, analytics and AI-assisted recruitment intelligence.",
    stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Redis", "Arq", "LangGraph"],
  },
  {
    company: "Xenkrypt Technologies",
    role: "Software Intern",
    period: "Dec 2025 — Mar 2026",
    current: false,
    location: "Chennai",
    summary:
      "Built production-ready interfaces with Next.js and Tailwind CSS and designed backend architecture for an encrypted mail service with secure REST APIs.",
    stack: ["Next.js", "Tailwind CSS", "Node.js", "Express.js", "REST APIs"],
  },
  {
    company: "Cargo Matters",
    role: "Software Intern",
    period: "Nov 2025 — Jan 2026",
    current: false,
    location: "Remote",
    summary:
      "Built web automation pipelines for structured data extraction and Chrome extensions for automated lead-generation workflows.",
    stack: ["Node.js", "Puppeteer", "Chrome Extensions"],
  },
];

export const toolkit = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "EJS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Multer"],
  },
  {
    title: "Data & Cloud",
    skills: ["MongoDB", "MongoDB Atlas", "Cloudinary", "Google Drive API"],
  },
  {
    title: "Tools",
    skills: ["Git & GitHub", "Chrome Extensions", "Gemini API", "Webpack", "CLI Scripting"],
  },
];

export const projects: {
  title: string;
  year: string;
  description: string;
  tags: string[];
  href?: string;
}[] = [
  {
    title: "College Placement Intelligence Platform",
    year: "Sep 2026",
    description:
      "An agentic RAG system for sensitive placement queries. A LangGraph workflow routes questions between a deterministic PostgreSQL rules engine and FAISS retrieval, with human escalation for low-confidence answers.",
    tags: ["FastAPI", "Next.js", "PostgreSQL", "LangGraph", "FAISS", "Docker"],
  },
  {
    title: "GitHub Issue Spider",
    year: "Jul 2026",
    description:
      "A SaaS platform that automates open-source GitHub issue tracking with real-time Discord alerts, configurable filtering and serverless background processing through GitHub Actions.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "GitHub Actions"],
  },
];

export const contactTopics = [
  "a project",
  "an opportunity",
  "a collaboration",
  "something else",
];
