"use client";
import { useBlogData } from "../hooks/useBlogData";
import BlogTile from "../components/BlogTile";
import BlogFilter from "../components/BlogFilter";

const BlogListing = () => {
  const { filteredBlogs, allTags, selectedTag, setSelectedTag } = useBlogData();
  return (
    <div className="mx-auto flex flex-col p-6 font-mono sm:max-w-[40rem] md:mt-[80px] md:p-0 lg:max-w-[40rem] mt-[30px]">
      <div
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fade-in-up"
        style={{ animationDelay: "0.05s" }}
      >
        <h1 className="text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
          Recent Writings
        </h1>
        <BlogFilter
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />
      </div>

      <div className="mt-6 space-y-10">
        {filteredBlogs.map((blog, index) => (
          <BlogTile
            key={blog.slug ?? index}
            blog={blog}
            className="animate-fade-in-up"
            style={{ animationDelay: `${0.1 + index * 0.04}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogListing;
