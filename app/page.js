import ExperienceTile from "./components/ExperienceTile";
import BlogTile from "./components/BlogTile";
import Image from 'next/image';
import SocialTiles from "./components/SocialTiles";
import Link from "next/link";
import ExternalCTA from "./components/ExternalCTA";
import * as data from "../public/data.json";
import { ArrowUpRight, Github, Linkedin, Mail} from 'lucide-react'
import { If,Else } from "react-if";


export default function Home() {
  const WORK_EXPERIENCE = data.workExperience;
  const BLOG_DATA = data.blogData;  
  return (  
    <>
      <div className="max-w-[50rem] mx-auto md:mt-[100px] mt-[30px] flex flex-col p-6 md:p-0 ">
        <Image src='/D.png' height={150} width={150} alt="Sarthak Chauhan" 
        className="rounded-full aspect-square object-cover border-white border-2 w-4/12 sm:w-[150px]"
        placeholder="empty"
        priority
        />
        <div className='intro'>
            <h1 className='md:text-3xl text-2xl mt-[24px] font-inter font-semibold'>Hey, I&apos;m Sarthak 👋🏼</h1>
            <SocialTiles />
            <div className='para-class tracking-wide font-regular'>
                <p className='text-[16px] w-70 font-inter mt-[16px] leading-2' id='self-intro'>
                    A third-year Computer Science student who thrives on crafting software from scratch and setting it free in the wild web. I&apos;ve been coding for some time now, and yes, I can center divs (a true test of developer prowess!).
                </p>
                <p className='text-[16px] w-70 font-inter mt-[16px] leading-2' id='work-intro'>
                Currently diving deep into computer vision and machine learning, because why not solve the real world with cool tech? In my downtime, I love working on building products.
                </p>
            </div>
        </div>
        <div className="work-exp mb-[10px] mt-8 md:mt-16">
            <h1 className='md:text-3xl text-2xl sm:[24px] mt-[16px] font-inter font-semibold'>Work Experience</h1>
            <div className="space-y-6 md:space-y-16 mt-[24px]">
              {WORK_EXPERIENCE.map((work, i) => ( 
                <ExperienceTile work={work} key={i} />
              ))}
            </div>
        </div>
        <If condition={BLOG_DATA.length != 0}>
          <div className="work-exp mb-[10px] mt-16">
              <h1 className='font-inter font-semibold md:text-3xl text-2xl'>Writings</h1>
              <div className="space-y-16 mt-[24px]">
                {BLOG_DATA.map((blog, i) => ( 
                  <BlogTile blog={blog} key={i} />
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
