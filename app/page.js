import ExperienceTile from "./components/ExperienceTile";
import BlogTile from "./components/BlogTile";
import Image from 'next/image';
import SocialTiles from "./components/SocialTiles";
import Link from "next/link";
import ExternalCTA from "./components/ExternalCTA";
import * as data from "../public/data.json";
import { ArrowUpRight, ArrowDown} from 'lucide-react'
import { If,Else } from "react-if";

export default function Home() {
  const WORK_EXPERIENCE = data.workExperience.slice(0,2);
  const BLOG_DATA = data.blogData
    .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
    .slice(0, 2);
  
  return (  
    <>
      <div className="lg:max-w-[40rem] sm:max-w-[40rem] mx-auto md:mt-[100px] mt-[30px] flex flex-col p-6 md:p-0 ">
        <Image src='/D.png' height={500} width={500} alt="Sarthak Chauhan" 
        className="rounded-full aspect-square object-cover border-white border-2 w-4/12 sm:w-[140px] lg:w-[120px]"
        placeholder="empty"
        priority
        /> 
        <div className='intro'>
            <h1 className='md:text-3xl text-2xl mt-[24px] leading-8 font-inter font-medium'>Hey 👋🏼 I&apos;m Sarthak. 
              <span className="opacity-60"> I'm a software engineer and an AI enthusiast</span>
            </h1>
            {/* <SocialTiles /> */}
            <div className='para-class tracking-wide font-regular'>
                <p className='text-[16px] w-70 font-inter mt-[16px] leading-2' id='self-intro'>
                  I fix problems through code, design and some good ol' brainstorming.
                </p>
                <p className='text-[16px] w-70 font-inter mt-[16px] leading-2 opacity-90' id='work-intro'>
                  - latest project
                  <br/>
                  - latest blog
                  <br/>
                  - currently reading (desigining data intensive applications)
                  <br/>
                  - currently learning (machine learning)
                </p>
                <p className='text-[16px] w-70 font-inter mt-[16px] leading-2' id='self-intro'>
                  To talk with a more extrovert version of me, prompt below.<span className="inline-block ml-[5px] mt-[2px]"><ArrowDown className="w-3.5 h-3.5" /></span> 
                </p>
            </div>
        </div>
        <div className="work-exp mb-[10px] mt-4 md:mt-10">
            <h1 className='md:text-3xl text-2xl sm:[24px] mt-[16px] font-inter font-medium'>Work experience</h1>
            <div className="space-y-6 md:space-y-16 mt-[24px]">
              {WORK_EXPERIENCE.map((work, i) => ( 
                <ExperienceTile work={work} key={i} />
              ))}
            </div>
            <div className="mt-[24px]">
              <ExternalCTA
                  action="/Resume.pdf"
                  content="View full resume"
                  icon={<ArrowUpRight className="w-3.5 h-3.5"/>}
              /> 
            </div>
        </div>
        <If condition={BLOG_DATA.length != 0}>
          <div className="work-exp mb-[10px] mt-16">
              <h1 className='font-inter font-semibold md:text-3xl text-2xl'>Recent Writings</h1>
              <div className="space-y-10 mt-[24px]">
                {BLOG_DATA.map((blog, i) => ( 
                  <BlogTile blog={blog} key={i} tags={false}/>
                ))}
              </div>
              <div className="mt-[16px]">
                <ExternalCTA
                    action="/blog"
                    content="Checkout all blogs"
                    icon={<ArrowUpRight className="w-3.5 h-3.5"/>}
                /> 
              </div>
        </div>
        </If>
        <Else>
          <></>
        </Else>
        <div className="mb-[20px] mt-8 md:mt-16">
            <h1 className='font-inter font-semibold md:text-3xl text-2xl'>Get in touch</h1> 
            <div className="block mt-[16px] md:mt-[24px]">
              <span className="font-inter text-[16px] leading-widest">
              I am actively seeking Summer 2025 internship opportunities to further expand my skills in software engineering. Feel free to reach out at <span className="font-inter hover:text-hyperlink cursor-pointer underline transition-color"><Link href="mailto:sarthak.chauhan@sjsu.edu">sarthak.chauhan@sjsu.edu</Link></span>—let&apos;s connect!
              </span>
            </div>
        </div>
      </div>
    </>
  );
}
