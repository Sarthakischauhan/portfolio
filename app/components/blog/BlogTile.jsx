import React from "react";
import Link from "next/link";
import moment from "moment";

const gradients = [
  "linear-gradient(135deg, #1f2937 0%, #334155 50%, #0f172a 100%)",
  "linear-gradient(135deg, #0f766e 0%, #0ea5e9 55%, #1e3a8a 100%)",
  "linear-gradient(135deg, #7c2d12 0%, #ea580c 55%, #1f2937 100%)",
  "linear-gradient(135deg, #1e293b 0%, #6d28d9 55%, #0f172a 100%)",
  "linear-gradient(135deg, #164e63 0%, #22c55e 55%, #0f172a 100%)",
];

const pickGradient = (seed = "") => {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 2147483647;
  }
  return gradients[hash % gradients.length];
};

const BlogTile = ({ blog, tags = true, className = "", style }) => {
  return (
    <div
      className={`mt-2 flex w-full flex-col gap-y-2 font-geist ${className}`}
      style={style}
    >
      <Link
        href={`/blog/${blog.slug}`}
        aria-label={`Open ${blog.title}`}
        className="block h-40 w-full rounded-lg transition-transform hover:scale-[1.01]"
        style={{ backgroundImage: pickGradient(blog.slug || blog.title) }}
      />
      <h6 className="timeline text-body text-white/70">
        {moment(blog.date_posted, "YYYY-MM-DD").format("LL")}
      </h6>
      <Link
        href={`/blog/${blog.slug}`}
        className="text-blog-title font-medium text-white transition-colors hover:text-white"
      >
        <h1 className="leading-relaxed">
          {blog.title}
        </h1>
      </Link>
      <p className="text-xs leading-relaxed text-white tracking-widest text-white/70">
        {blog.desc}
      </p>
      <span>
        {tags && (
          <div className="mt-2 flex flex-wrap gap-2">
            {blog.tags &&
              blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-body text-white/70 transition-colors hover:text-white/90"
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
