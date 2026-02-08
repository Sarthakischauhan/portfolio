"use client";
import { useBlogData } from "../hooks/useBlogData";
import BlogTile from "../components/BlogTile";
import BlogFilter from "../components/BlogFilter";
import PageContainer from "../components/PageContainer";

const BlogListing = () => {
  const { filteredBlogs, allTags, selectedTag, setSelectedTag } = useBlogData();
  return (
    <PageContainer className="flex max-w-[30rem] flex-col gap-8 mt-10 mb-10 pt-8">
      <div
        className="relative z-50 flex gap-4 flex-row items-center justify-between animate-fade-in-up"
        style={{ animationDelay: "0.05s" }}
      >
        <h1 className="text-name-heading font-medium text-white">
          Writings
        </h1>
        <BlogFilter
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />
      </div>

      <div className="mt-2 space-y-6">
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
