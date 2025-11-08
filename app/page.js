import SocialTiles from "./components/SocialTiles";
import Link from "next/link";
import data from "../public/data.json";
import { SectionList } from "./components/SectionList";
const PROJECTS = [
  {
    name: "LangCanvas",
    summary:
      "Realtime diagramming canvas that streams LangGraph workflows and supports multiplayer editing with CRDT sync.",
    tech: ["Next.js", "Liveblocks", "LangChain", "Tailwind"],
    href: "https://github.com/example/langcanvas",
  },
  {
    name: "ChargeIQ",
    summary:
      "Energy usage co-pilot that forecasts EV charging demand, alerts on anomalies, and plugs into in-house telemetry APIs.",
    tech: ["TypeScript", "tRPC", "PostgreSQL", "Temporal"],
    href: "https://github.com/example/chargeiq",
  },
  {
    name: "Sentinel HUD",
    summary:
      "Driver heads-up display with live CAN bus metrics, lap analytics, and OTA layout updates for Formula SAE.",
    tech: ["React", "WebGL", "Rust", "Wasm"],
    href: "https://github.com/example/sentinel-hud",
  },
];

const containerClass =
  "mx-auto flex max-w-[40rem] flex-col gap-8 px-6 mt-10 mb-10 pt-8 md:px-0";
const paragraphClass =
  "text-sm font-mono leading-relaxed text-white/70 sm:text-base";

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function Home() {
  const WORK_EXPERIENCE = data.workExperience;
  const RECENT_BLOGS = [...data.blogData]
    .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
    .slice(0, 2);

  return (
    <>
      <div className={containerClass}>
        <div
          className="intro animate-fade-in-up"
          style={{ animationDelay: "0.05s" }}
        >
          <h1 className="mt-2 text-3xl font-mono font-medium leading-tight sm:text-[28px] md:text-4xl">
            Sarthak Chauhan
          </h1>

          <SocialTiles />
          <div className="para-class mt-2 space-y-4">
            <p className={paragraphClass}>
              i love to craft user interfaces, write apis, multiply matrices and
              some good ol&apos; brainstorming. actively looking for full time
              roles for winter 2025
            </p>
            <p className={paragraphClass}>
              currently i am finishing up school and working on some fullstack
              and ai projects.
            </p>
          </div>
        </div>
        <SectionList
          label="previously worked at"
          items={WORK_EXPERIENCE}
          animationDelay={0.1}
          getKey={(exp) => `${exp.company}-${exp.team ?? exp.title}`}
          renderHeading={(exp) => (
            <span className="flex flex-wrap gap-2 text-sm sm:text-base">
              <span className="capitalize">{exp.title}</span>
              <span className="text-white/60 text-xs sm:text-sm flex items-center">
                @ {exp.company}
              </span>
              {exp.team && (
                <span className="text-white/50 text-xs sm:text-sm">
                  ({exp.team})
                </span>
              )}
            </span>
          )}
          renderBody={(exp) => (
            <>
              <p>{exp.roledesc}</p>
            </>
          )}
        />
        <SectionList
          label="recent projects"
          items={PROJECTS}
          animationDelay={0.2}
          getKey={(project) => project.name}
          renderHeading={(project) => (
            <Link
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base transition-colors hover:text-hyperlink sm:text-lg"
            >
              {project.name}
            </Link>
          )}
          renderBody={(project) => (
            <>
              <p>{project.summary}</p>
            </>
          )}
        />
        <SectionList
          label="latest writing"
          items={RECENT_BLOGS}
          animationDelay={0.3}
          getKey={(blog) => blog.slug}
          renderHeading={(blog) => (
            <Link
              href={`/blog/${blog.slug}`}
              className="text-base transition-colors hover:text-hyperlink sm:text-lg"
            >
              {blog.title}
            </Link>
          )}
          renderBody={(blog) => (
            <>
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-wide text-white/50 sm:text-xs">
                <span>{formatDate(blog.date_posted)}</span>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-sm leading-relaxed sm:text-base">
                {blog.desc}
              </p>
            </>
          )}
        />
      </div>
    </>
  );
}
