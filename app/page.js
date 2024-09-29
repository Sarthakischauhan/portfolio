import ExperienceTile from "./components/ExperienceTile";
import BlogTile from "./components/BlogTile";
import * as data from "@/public/data.json";
import Image from 'next/image';
import Link from "next/link";
import Navbar from "./components/Navbar";


export default function Home() {
  const WORK_EXPERIENCE = data.workExperience;
  const BLOG_DATA = data.blogData;  
  return (
    <>
      <Navbar />
      <div className="max-w-[50rem] mx-auto md:mt-[100px] flex flex-col">
        <Image src='/D.png' height={150} width={150} alt="Dummy Image"
        className="rounded-full aspect-square object-cover"
        />
        <div className='intro'>
            <h1 className='text-3xl mt-[24px] font-inter font-semibold'>Hey, I'm Sarthak 👋🏼</h1>
            <div className='para-class tracking-wide font-medium'>
                <p className='text-l w-70 font-mono mt-[16px]' id='self-intro'>
                    I am a third-year computer science student who loves writing software from scratch and publish it on the web. Do love product as well
                </p>
                <p className='text-l w-70 font-mono mt-[24px]' id='work-intro'>
                    Currently exploring computer vision and working on <a href="/" className='underline hover:text-hyperlink'>spartan navigate app</a>
                </p>
            </div>
        </div>
        <div className="work-exp mb-[10px] mt-16">
            <h1 className='text-3xl font-inter font-semibold'>Work Experience</h1>
            <div className="space-y-16 mt-[24px]">
              {WORK_EXPERIENCE.map((work, i) => ( 
                <ExperienceTile work={work} key={i} />
              ))}
            </div>
        </div>
        <div className="work-exp mb-[10px] mt-16">
            <h1 className='text-3xl font-inter font-semibold'>Writings</h1>
            <div className="space-y-10 mt-[24px]">
              {BLOG_DATA.map((blog, i) => ( 
                <BlogTile blog={blog} key={i} />
              ))}
            </div>
            <Link href={"/"}>
              <h1 className="font-inter text-[18px] font mt-[24px]">Checkout all blogs.</h1>
            </Link>
        </div>
      </div>
    </>
  );
}
