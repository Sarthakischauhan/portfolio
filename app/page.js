import SocialTiles from "./components/SocialTiles";
import Link from "next/link";
import data from "../public/data.json";
import { SectionList } from "./components/SectionList";
import PageContainer from "./components/PageContainer";
import { GithubCalendar }  from "./components/GithubCalendar";

const containerClass =
  "flex max-w-[40rem] flex-col gap-8 mt-10 mb-10 pt-8";
const paragraphClass =
  "text-body font-mono leading-relaxed text-white/70";
const headingLinkClass =
  "text-section-heading transition-colors hover:text-hyperlink";

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function Home() {
  const PROJECTS = [...data.projects]
  .slice(0,4)
  const WORK_EXPERIENCE = data.workExperience;
  const RECENT_BLOGS = [...data.blogData]
    .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
    .slice(0, 2);

  return (
    <>
      <PageContainer className={containerClass}>
        <div
          className="intro animate-fade-in-up"
          style={{ animationDelay: "0.05s" }}
        >
          <h1 className="text-name-heading font-mono font-medium leading-tight">
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
        <GithubCalendar />
        <SectionList
          label="previously worked at"
          items={WORK_EXPERIENCE}
          animationDelay={0.1}
          getKey={(exp) => `${exp.company}-${exp.team ?? exp.title}`}
          renderHeading={(exp) => (
            <span className="flex flex-wrap gap-2 text-section-heading">
              <span className="capitalize">{exp.title}</span>
              <span className="flex items-center text-white/60">
                @ {exp.company}
              </span>
              {exp.team && (
                <span className="text-white/50">
                  ({exp.team})
                </span>
              )}
            </span>
          )}
          renderBody={(exp) => (
            <>
              <p className="text-body">{exp.roledesc}</p>
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
              href={project.src}
              target="_blank"
              rel="noopener noreferrer"
              className={headingLinkClass}
            >
              {project.name}
            </Link>
          )}
          renderBody={(project) => (
            <>
              <p className="text-body">{project.desc}</p>
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
              className={headingLinkClass}
            >
              {blog.title}
            </Link>
          )}
          renderBody={(blog) => (
            <>
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-meta text-white/50 sm:text-xs">
                <span>{formatDate(blog.date_posted)}</span>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <p className="mt-2 text-body">
                {blog.desc}
              </p>
            </>
          )}
        />
      </PageContainer>
    </>
  );
}
