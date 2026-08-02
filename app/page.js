import data from "../public/data.json";
import Image from "next/image";
import Link from "next/link";
import { getGithubContributions } from "./lib/github";
import {
  CaptionImage,
  GithubCalendar,
  HomeBlogTile,
  PageContainer,
  SocialTiles,
  Tiles,
} from "./components";

const containerClass = "flex max-w-[30rem] flex-col gap-8 mt-10 mb-10 pt-8";
const paragraphClass =
  "text-body font-geist leading-relaxed tracking-wider text-white";

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default async function Home() {
  const PROJECTS = [...data.projects].slice(0, 4);
  const WORK_EXPERIENCE = data.workExperience;
  const RECENT_BLOGS = [...data.blogData]
    .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
    .slice(0, 2);
  const GITHUB_ACTIVITY = await getGithubContributions(
    "sarthakischauhan",
    "last"
  );

  return (
    <>
      <PageContainer className={containerClass}>
        <div
          className="intro animate-fade-in-up"
          style={{ animationDelay: "0.05s" }}
        >
          <div className="flex justify-start gap-3 items-end cursor-pointer">
            <div className="rounded-sm overflow-hidden w-24 h-24 relative">
              <Image
                src="/D.png"
                fill
                alt="my face3"
                priority
                sizes="6rem"
              />
            </div>
          </div>
          <SocialTiles />
          <div className="para-class mt-2 space-y-4">
            <p className={paragraphClass}>
              I am a software engineer at Tesla working on web interfaces,
              agents and microservices. Previously I have worked on full stack
              applications, studied computer science at SJSU and tried my hand
              at powerlifting.
            </p>
            <div className=""></div>
            <p className={paragraphClass}>
              I&apos;m based in the Bay Area, always up for a good coffee, talk
              about building agents and ah! music!
            </p>
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.07s" }}>
          <GithubCalendar activity={GITHUB_ACTIVITY} />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
          <Tiles workExperience={WORK_EXPERIENCE} />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex flex-col">
            <h4 className="opacity-60 font-medium text-section-heading">PROJECTS</h4>
            <div className="mt-3 flex flex-col gap-4">
              <ul className="flex flex-col">
                {PROJECTS.map((project) => (
                  <li key={project.name} className="pb-3">
                    <Link
                      href={project.href || project.src}
                      className="group block rounded-md px-1 py-1 -mx-1 transition-colors hover:bg-white/5"
                    >
                      <div className="space-y-1">
                        <span className="text-white leading-snug transition-colors group-hover:text-white/90 tracking-wide text-xs">
                          {project.name}
                        </span>
                        <p className="text-[11px] leading-relaxed tracking-wide text-white/60">
                          {project.desc}
                        </p>
                      </div>
                    </Link>
                    <div className="mt-3 border-b border-gray-300 opacity-10"></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
          <CaptionImage
            src="/sf.jpeg"
            priority={true}
            alt="San Francisco"
            caption="Little Italy, SF"
          />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
          <HomeBlogTile />
        </div>
      </PageContainer>
    </>
  );
}
