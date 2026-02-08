import SocialTiles from "./components/SocialTiles";
import data from "../public/data.json";
import PageContainer from "./components/PageContainer";
import Tiles, { BlogTile } from "./components/Tiles";
import CaptionImage from "./components/CaptionImage";
import Image from "next/image";

const containerClass =
  "flex max-w-[30rem] flex-col gap-8 mt-10 mb-10 pt-8";
const paragraphClass =
  "text-body font-geist leading-relaxed text-white";

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
          <div className="ounded-full overflow-hidden w-24 h-24 relative">
            <Image src="/D.png" fill alt="my face3" />
          </div>
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
          <BlogTile />
        </div>
      </PageContainer>
    </>
  );
}
