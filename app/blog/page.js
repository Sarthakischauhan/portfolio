"use client"
import { useBlogData } from '../hooks/useBlogData';
import BlogTile from '../components/BlogTile';
import BlogFilter from '../components/BlogFilter';

const BlogListing = () => {
  const { filteredBlogs, allTags, selectedTag, setSelectedTag } = useBlogData();
  return (
    <div className="max-w-[50rem] mx-auto md:mt-[80px] mt-[30px] flex flex-col p-6 md:p-0 font-inter">
        <div className="flex justify-between items-center">
            <div className="text-3xl font-semibold">
                Recent Writings
            </div>
            <BlogFilter 
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              allTags={allTags}
            />
        </div>

        <div className="space-y-10 mt-[16px]">
            {filteredBlogs.map((blog, index) => ( 
                <BlogTile key={index} blog={blog} /> 
            ))}
        </div>
    </div>
  )
}

export default BlogListing;