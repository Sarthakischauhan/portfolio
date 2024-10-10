import React from "react";
import Link from "next/link";
const BlogTile = ({ blog }) => {
    return (
      <div className="w-full flex flex-col gap-y-1"> 
         <h6 className="text-[10px] timeline font-inter tracking-wide">{blog.date_posted}</h6>
         <Link href={`/blog/`} className="text-[16px]">
          <h1 className="font-inter font-semibold hover:text-hyperlink cursor-pointer hover:underline transition-color">{blog.title}</h1>
         </Link>
         <p className="font-inter font-regular text-[14px] tracking-wide opacity-70">{blog.desc}</p>
      </div>
    );
  };
export default BlogTile; 