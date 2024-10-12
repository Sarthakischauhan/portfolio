// import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import fs from "fs";
import path from "path";
import ExternalCTA from '../../components/ExternalCTA';
import { ArrowUpRight } from 'lucide-react';

const NotFound = () => (
  <div>
    <h1>404 - Not Found</h1>
    <p>The requested blog post could not be found.</p>
    <div className="mt-[16px]">
        <ExternalCTA
            action="/blog"
            content="Back To Blogs"
            icon={<ArrowUpRight className="w-3.5 h-3.5"/>}
        /> 
      </div>
  </div>
);

const BlogPost = ({params}) => {
  const { slug } = params;
  
  const filePath = slug ? path.join(process.cwd(), 'content', `${slug}.mdx`) : null;
  const fileExists = slug && fs.existsSync(filePath); 

  // Dynamically import the MDX component based on the slug
  const Blog = fileExists ? dynamic(() => import(`../../../content/${slug}.mdx`)) : null;

  return (
    <>
      <div className="prose dark:prose-invert prose-sm max-w-[50rem] m-auto font-inter md:mt-[50px] mt-[30px] flex flex-col p-6 md:p-0 mb-[30px] md:mb-[40px]">
          {Blog ? <Blog /> : <NotFound />}
      </div>
    </>
  )
}

export default BlogPost;