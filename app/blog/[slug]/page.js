import Blog from "../../../content/blog.mdx"
import Navbar from "../../components/Navbar";
import Image from "next/image";
const BlogPost = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full max-w-[50rem] mx-auto">
        <Image
          src="/sample.jpg"
          alt="Blog post cover image"
          width={800}
          height={533}
          className="object-cover w-full"
          priority
        />
      </div>
      <div className="prose dark:prose-invert prose-sm max-w-[50rem] m-auto font-inter">
          <Blog />
      </div>
    </>
  )
}

export default BlogPost;