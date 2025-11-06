import ExperienceTile from "./components/ExperienceTile";
import BlogTile from "./components/BlogTile";
import Image from "next/image";
import SocialTiles from "./components/SocialTiles";
import Link from "next/link";
import ExternalCTA from "./components/ExternalCTA";
import * as data from "../public/data.json";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { If, Else } from "react-if";

export default function Home() {
  const WORK_EXPERIENCE = data.workExperience.slice(0, 2);
  const BLOG_DATA = data.blogData
    .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
    .slice(0, 2);

  return (
    <>
      <div className="lg:max-w-[40rem] sm:max-w-[40rem] mx-auto md:mt-[100px] mt-[30px] flex flex-col p-6 md:p-0 ">
        {/* <Image
          src="/D.png"
          height={500}
          width={500}
          alt="Sarthak Chauhan"
          className="rounded-full aspect-square object-cover border-white border-2 w-4/12 sm:w-[140px] lg:w-[120px]"
          placeholder="empty"
          priority
        />*/}
        <div className="intro">
          <h1 className="md:text-2xl text-xl mt-[10px] leading-8 font-mono font-medium">
            hi there! nice to meet ya, i am sarthak
            {/* <span className="opacity-60">
              {" "}
              I&apos;m a software engineer and an AI enthusiast
            </span>*/}
          </h1>
          <SocialTiles />
          <div className="para-class tracking-wide font-regular">
            <p
              className="text-[16px] w-70 font-mono mt-[8px] leading-2  opacity-60"
              id="self-intro"
            >
              i love to craft user interfaces, write apis, multiply matrices and
              some good ol&apos; brainstorming. actively looking for full time
              roles for winter 2025
            </p>
            <p
              className="text-[16px] w-70 font-mono mt-[16px] leading-2 opacity-60"
              id="self-intro"
            >
              currently i am finishing up school and working on some fullstack
              and ai projects.
            </p>
            <p className="text-[16px] w-70 font-mono mt-[16px] leading-2 opacity-100">
              previously worked at
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 mt-[16px] font-mono w-70">
          <h4 className="text-lg tracking-wide underline text-red-400">
            tesla
          </h4>
          <div className="indent-3 flex flex-col gap-3">
            {WORK_EXPERIENCE.map((exp, idx) => (
              <div className="" key={idx}>
                <p className="text-lg">- swe @ {exp.team}</p>
                <div className="indent-0 ml-6 leading-6 text-sm opacity-60">
                  {exp.roledesc}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <p className="text-[16px] w-70 font-mono mt-[16px] leading-2 opacity-100">
            checkout my projects and writings
          </p>
          <div className="flex flex-col lg:flex-row gap-4 mt-6 w-full font-mono">
            <Link href={"/projects"} className="flex-1">
              <div className="p-6 h-[150px] flex align-bottom rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <h3 className="text-lg font-mono font-medium mb-2">Projects</h3>
              </div>
            </Link>

            <Link href="/blog" className="flex-1">
              <div className="p-6 h-[150px] rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                <h3 className="text-lg font-mono font-medium mb-2">Writings</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
