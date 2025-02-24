import React from "react";
import Link from "next/link";
import moment from "moment";

const BlogTile = ({ blog, tags=true }) => {
    return (
      <div className="w-full flex flex-col gap-y-1 mt-2"> 
         <h6 className="text-[11px] timeline font-inter tracking-wide">{moment(blog.date_posted, "MM-DD-YYYY").format("LL")}</h6>
         <Link href={`/blog/${blog.slug}`} className="text-[16px]">
          <h1 className="font-inter font-semibold hover:text-hyperlink cursor-pointer hover:underline transition-color">{blog.title}</h1>
         </Link>
         <p className="font-inter font-regular text-[14px] tracking-wide opacity-70">{blog.desc}</p>
         {tags &&
            <div className="flex gap-2 flex-wrap mt-2">
              {blog.tags && blog.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="text-sm font-inter font-medium text-gray-100 hover:text-hyperlink transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
         }

      </div>
    );
  };
export default BlogTile; 