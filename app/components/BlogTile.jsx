import React from "react";
import Link from "next/link";
import moment from "moment";

const BlogTile = ({ blog, tags = true, className = "", style }) => {
  return (
    <div
      className={`mt-2 flex w-full flex-col gap-y-2 font-mono ${className}`}
      style={style}
    >
      <h6 className="timeline text-xs font-mono tracking-wide text-white/70 sm:text-sm">
        {moment(blog.date_posted, "YYYY-MM-DD").format("LL")}
      </h6>
      <Link
        href={`/blog/${blog.slug}`}
        className="text-lg transition-colors hover:text-hyperlink hover:underline sm:text-xl"
      >
        <h1 className="font-mono font-semibold leading-tight">
          {blog.title}
        </h1>
      </Link>
      <p className="font-mono font-regular text-sm leading-relaxed tracking-wide opacity-70 sm:text-base">
        {blog.desc}
      </p>
      <span>
        {tags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags &&
              blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs font-mono font-medium text-gray-100 transition-colors hover:text-hyperlink sm:text-sm"
                >
                  #{tag}
                </span>
              ))}
          </div>
        )}
      </span>
    </div>
  );
};
export default BlogTile;
