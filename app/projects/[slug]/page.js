import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import { ExternalCTA, PageContainer } from "../../components";
import { ArrowUpRight } from "lucide-react";
import data from "../../../public/data.json";

export function generateStaticParams() {
  return data.projects.map((project) => ({
    slug: project.href.split("/").pop(),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  if (slug === "symphony") {
    const title = "Symphony | Open-source coding agent and Python harness";
    const description = "Run an open-source coding agent in your terminal, browser, or ACP editor. Build your own Python agents with Symphony Harness.";
    const url = "/projects/symphony";
    const image = { url: "/projects/symphony/brand/share.png", width: 1200, height: 630, alt: "Symphony. A coding agent you can steer." };

    return {
      title: { absolute: title },
      description,
      alternates: { canonical: url },
      icons: { icon: "/projects/symphony/brand/mark.svg" },
      openGraph: { title, description, url, images: [image] },
      twitter: { card: "summary_large_image", title, description, images: [image] },
    };
  }

  const project = data.projects.find(
    (entry) => entry.href.split("/").pop() === slug
  );

  if (!project) {
    return { title: "Not found" };
  }

  return {
    title: project.name,
    description: project.desc,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.name} — Sarthak Chauhan`,
      description: project.desc,
      url: `/projects/${slug}`,
    },
  };
}

const NotFound = () => (
  <div className="space-y-3 text-center font-geist">
    <h1 className="text-2xl font-semibold text-white">404 - Not Found</h1>
    <p className="text-sm text-white/70 sm:text-base">
      The requested project page could not be found.
    </p>
    <div className="mt-4 flex justify-center">
      <ExternalCTA
        action="/"
        content="Back Home"
        icon={<ArrowUpRight className="h-3.5 w-3.5" />}
      />
    </div>
  </div>
);

const ProjectPage = async ({ params }) => {
  const { slug } = await params;

  const filePath = slug
    ? path.join(process.cwd(), "content", "projects", `${slug}.mdx`)
    : null;
  const fileExists = slug && fs.existsSync(filePath);

  const Project = fileExists
    ? dynamic(() => import(`../../../content/projects/${slug}.mdx`))
    : null;

  if (slug === "symphony" && Project) {
    return <Project />;
  }

  return (
    <PageContainer className="flex max-w-[30rem] flex-col gap-8 mt-10 mb-10 pt-8 text-body font-geist text-white/80">
      {Project ? <Project /> : <NotFound />}
    </PageContainer>
  );
};

export default ProjectPage;
