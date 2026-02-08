import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import data from "../../../public/data.json";

const blogs = [...data.blogData]
  .sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted))
  .slice(0, 2)
  .map((blog) => ({
    title: blog.title,
    date: new Date(blog.date_posted)
      .toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
      .toLowerCase(),
    href: `/blog/${blog.slug}`,
  }));

export default function BlogTile() {
  return (
    <div className="">
      <h4 className="opacity-60 font-medium text-section-heading">WRITINGS</h4>
      <div className="mt-3 flex flex-col gap-4">
        <ul className="flex flex-col">
          {blogs.map((blog) => (
            <li key={blog.title} className="pb-3">
              <Link
                href={blog.href}
                className="group flex items-start justify-between gap-2 rounded-md px-1 py-1 -mx-1 transition-colors hover:bg-white/5 text-xs"
              >
                <span className="text-white leading-snug transition-colors group-hover:text-white/90">
                  {blog.title}
                </span>
                <span className="shrink-0 text-white/50 pt-0.5 transition-colors group-hover:text-white/80">
                  {blog.date}
                </span>
              </Link>
              <div className="mt-3 border-b border-gray-300 opacity-10"></div>
            </li>
          ))}
        </ul>
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-xs text-white/70 transition-colors hover:text-white"
        >
          all posts
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
