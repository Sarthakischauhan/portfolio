import Blog from "../../../content/blog.mdx"
import Navbar from "../../components/Navbar";
import Image from "next/image";
const BlogPost = () => {
  return (
    <>
      <div className="prose dark:prose-invert prose-sm max-w-[50rem] m-auto font-inter md:mt-[40px] mt-[30px] flex flex-col p-6 md:p-0 ">
          <Blog />
      </div>
    </>
  )
}

export default BlogPost;