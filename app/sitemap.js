import fs from "fs";
import path from "path";
import data from "../public/data.json";
import { siteUrl } from "./lib/site";

export default function sitemap() {
  const now = new Date();
  const contentDir = path.join(process.cwd(), "content");

  const posts = data.blogData
    .filter((post) => fs.existsSync(path.join(contentDir, `${post.slug}.mdx`)))
    .map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date_posted ? new Date(post.date_posted) : now,
      changeFrequency: "yearly",
      priority: 0.7,
    }));

  const projects = data.projects
    .filter((project) => {
      const slug = project.href?.split("/").pop();
      return (
        slug &&
        fs.existsSync(path.join(contentDir, "projects", `${slug}.mdx`))
      );
    })
    .map((project) => ({
      url: `${siteUrl}${project.href}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts,
    ...projects,
  ];
}
