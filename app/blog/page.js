import BlogTile from '../components/BlogTile'; // Import the BlogTile component
import data from '../../public/data.json'; // Import blog data from data.json

const BlogListing = () => {
  // Sort blog data by date in descending order (newest first)
  const BLOG_DATA = [...data.blogData].sort((a, b) => 
    new Date(b.date_posted) - new Date(a.date_posted)
  );
  
  return (
    <div className="max-w-[50rem] mx-auto md:mt-[80px] mt-[30px] flex flex-col p-6 md:p-0 font-inter">
        <div className="text-3xl font-semibold">
            Recent Writings
        </div>

        <div className="space-y-10 mt-[16px]">
            {BLOG_DATA.map((blog, index) => ( 
                <BlogTile key={index} blog={blog} /> 
            ))}
        </div>

    </div>
  )
}

export default BlogListing;