import dynamic from "next/dynamic";
import fs from "fs";
import path from "path";
import { ExternalCTA, PageContainer } from "../../components";
import { ArrowUpRight } from "lucide-react";

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

  return (
    <PageContainer className="flex max-w-[30rem] flex-col gap-8 mt-10 mb-10 pt-8 text-body font-geist text-white/80">
      {Project ? <Project /> : <NotFound />}
    </PageContainer>
  );
};

export default ProjectPage;
