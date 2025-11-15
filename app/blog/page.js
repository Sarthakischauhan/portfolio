"use client";
import { useBlogData } from "../hooks/useBlogData";
import BlogTile from "../components/BlogTile";
import BlogFilter from "../components/BlogFilter";
import PageContainer from "../components/PageContainer";

const BlogListing = () => {
  const { filteredBlogs, allTags, selectedTag, setSelectedTag } = useBlogData();
  return (
    <PageContainer className="flex max-w-[40rem] flex-col gap-8 mt-10 mb-10 pt-8">
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
    </PageContainer>
  );
};

export default BlogListing;
