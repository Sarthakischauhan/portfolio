// import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import { ExternalCTA, PageContainer } from "../../components";
import { ArrowUpRight } from "lucide-react";
import data from "../../../public/data.json";
import "../../styles/xcode.css";

export function generateStaticParams() {
  return data.blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = data.blogData.find((entry) => entry.slug === slug);

  if (!post) {
    return { title: "Not found" };
  }

  return {
    title: post.title,
    description: post.desc,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.desc,
      url: `/blog/${slug}`,
      publishedTime: post.date_posted,
      tags: post.tags,
    },
  };
}

const NotFound = () => (
  <div className="space-y-3 text-center font-geist">
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

const BlogPost = async ({ params }) => {
  const { slug } = await params;

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
      <PageContainer className="prose-invert prose-sm flex max-w-[30rem] flex-col gap-8 mt-10 mb-10 pt-8 text-body font-geist text-white/80">
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
