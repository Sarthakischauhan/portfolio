import BlogTile from '../components/BlogTile'; // Import the BlogTile component
import data from '../../public/data.json'; // Import blog data from data.json

const BlogListing = () => {
  const BLOG_DATA = data.blogData;  
  return (
    <div className="max-w-[50rem] mx-auto md:mt-[80px] mt-[30px] flex flex-col p-6 md:p-0 font-inter">
        <div className="text-3xl font-semibold">
            Recent Writings
        </div>

        <div className="space-y-16 mt-[24px]">
            {BLOG_DATA.map((blog, index) => ( // Iterate over the blog data
                <BlogTile key={index} blog={blog} /> // Render BlogTile for each blog
            ))}
        </div>

    </div>
  )
}

export default BlogListing;