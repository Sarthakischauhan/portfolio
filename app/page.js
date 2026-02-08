import data from "../public/data.json";
import Image from "next/image";
import {
  CaptionImage,
  HomeBlogTile,
  PageContainer,
  SocialTiles,
  Tiles,
} from "./components";

const containerClass =
  "flex max-w-[30rem] flex-col gap-8 mt-10 mb-10 pt-8";
const paragraphClass =
  "text-body font-geist leading-relaxed tracking-wider text-white";

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
          <div className="rounded-sm overflow-hidden w-24 h-24 relative">
            <Image src="/D.png" fill alt="my face3" priority />
          </div>
          <SocialTiles />
          <div className="para-class mt-2 space-y-4">
            <p className={paragraphClass}>
              I am a software engineer at Tesla working on web interfaces, agents and microservices.
              Previously I have worked on full stack applications, studied computer science at SJSU and tried my hand at powerlifting.
            </p>
            <div className=""></div>
            <p className={paragraphClass}>
              I&apos;m based in the Bay Area, always up for a good coffee, talk about building agents and ah! music!
            </p>
          </div>
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
          <Tiles />
        </div>
        <div className="animate-fade-in-up" style={{animationDelay: "0.08s"}}>
          <CaptionImage
            src="/sf.jpeg"
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
