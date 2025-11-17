// import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import ExternalCTA from "../../components/ExternalCTA";
import { ArrowUpRight } from "lucide-react";
import PageContainer from "../../components/PageContainer";
import "../../styles/xcode.css";

const NotFound = () => (
  <div className="space-y-3 text-center font-mono">
    <h1 className="text-2xl font-semibold text-white">404 - Not Found</h1>
    <p className="text-sm text-white/70 sm:text-base">
      The requested blog post could not be found.
    </p>
    <div className="mt-4 flex justify-center">
      <ExternalCTA
        action="/blog"
        content="Back To Blogs"
        icon={<ArrowUpRight className="h-3.5 w-3.5" />}
      />
    </div>
  </div>
);

const BlogPost = ({ params }) => {
  const { slug } = params;

  const filePath = slug
    ? path.join(process.cwd(), "content", `${slug}.mdx`)
    : null;
  const fileExists = slug && fs.existsSync(filePath);

  // Dynamically import the MDX component based on the slug
  const Blog = fileExists
    ? dynamic(() => import(`../../../content/${slug}.mdx`))
    : null;

  return (
    <>
      <PageContainer className="prose-invert prose-sm flex max-w-[40rem] flex-col gap-8 mt-10 mb-10 pt-8 text-body font-mono">
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.08s" }}
        >
          {Blog ? <Blog /> : <NotFound />}
        </div>
      </PageContainer>
    </>
  );
};

export default BlogPost;
