import ExperienceTile from "./components/ExperienceTile";
import BlogTile from "./components/BlogTile";
import Image from 'next/image';
import Link from "next/link";
import Navbar from "./components/Navbar";
import ExternalCTA from "./components/ExternalCTA";
import * as data from "../public/data.json";
import { ArrowUpRight, Github, Linkedin, Mail} from 'lucide-react'
export default function Home() {
  const WORK_EXPERIENCE = data.workExperience;
  const BLOG_DATA = data.blogData;  
  return (
    <>
      <Navbar />
      <div className="max-w-[50rem] mx-auto md:mt-[100px] flex flex-col">
        <Image src='/D.png' height={150} width={150} alt="Dummy Image"
        className="rounded-full aspect-square object-cover border-white border-2 "
        />
        <div className='intro'>
            <h1 className='text-3xl mt-[24px] font-inter font-semibold'>Hey, I'm Sarthak 👋🏼</h1>
            <div className='para-class tracking-wide font-regular'>
                <p className='text-[16px] w-70 font-inter mt-[16px] leading-2' id='self-intro'>
                    a third-year computer science student who loves building software from the ground up and releasing it into the wild web. I have been programming for a while now, as you can see I can center some divs.
                </p>
                <p className='text-[16px] w-70 font-inter mt-[16px] leading-2' id='work-intro'>
                  currently exploring the field of computer vision and machine learning. In my free time, I work on building high-utility products.                
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
            <div className="mt-[16px]">
              <ExternalCTA
                  action="/blogs"
                  content="Checkout all blogs"
                  icon={<ArrowUpRight className="w-3.5 h-3.5 " />}
              /> 
            </div>
        </div>
        <div className="mb-[20px] mt-16">
            <h1 className='text-3xl font-inter font-semibold'>Get in touch</h1> 
            <div className="block mt-[24px]">
              <span className="font-inter font-medium text-[14px] mr-2">
                I am actively looking for summer 2025 internship opportunities, you can contact me at <span className="font-inter tracking-wide hover:text-hyperlink cursor-pointer underline"><Link href="mailto:sarthak.chauhan@sjsu.edu">sarthak.chauhan@sjsu.edu</Link></span>
              </span>
            </div>
        </div>
      </div>
    </>
  );
}
