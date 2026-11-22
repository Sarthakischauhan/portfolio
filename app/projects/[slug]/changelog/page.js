import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChangelogReleases } from "../../../lib/changelog-releases";
import PageContainer from "../../../components/layout/PageContainer";
import { changelogs } from "../../../../content/projects/changelogs";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return Object.keys(changelogs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = changelogs[slug];

  if (!project) notFound();

  return {
    title: `${project.name} Changelog`,
    description: project.description,
    alternates: { canonical: `/projects/${slug}/changelog` },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "America/Los_Angeles",
});

const linkStyle = "rounded-sm hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export default async function ChangelogPage({ params }) {
  const { slug } = await params;
  const project = changelogs[slug];

  if (!project) notFound();

  const releases = await getChangelogReleases(slug, project);
  const [latest] = releases;

  return (
    <PageContainer as="main" className="relative mb-10 mt-10 max-w-[30rem] pt-8 font-geist text-body text-white/80">
      <header className="space-y-4">
        <Link href={`/projects/${slug}`} className={`text-[11px] tracking-wide text-white/55 ${linkStyle}`}>
          {project.name}
        </Link>
        <h1 className="text-name-heading font-medium text-white">Changelog</h1>
      </header>

      <div className="relative mt-8 min-[800px]:mt-10">
        <nav
          aria-labelledby="release-index"
          className="mb-6 min-[800px]:absolute min-[800px]:inset-y-0 min-[800px]:right-full min-[800px]:mb-0 min-[800px]:mr-10 min-[800px]:w-24"
        >
          <div className="min-[800px]:sticky min-[800px]:top-8 min-[800px]:max-h-[calc(100dvh-4rem)] min-[800px]:overflow-y-auto">
            <h2 id="release-index" className="mb-2 text-xs font-medium tracking-wide text-white/55">
              Releases
            </h2>
            <ul className="flex flex-wrap gap-x-4 min-[800px]:flex-col">
              {releases.map(({ tag }) => (
                <li key={tag}>
                  <a
                    href={`#${tag}`}
                    className={`inline-flex min-h-8 items-center gap-2 whitespace-nowrap font-mono text-xs ${tag === latest.tag ? "text-white" : "text-white/60"} ${linkStyle}`}
                  >
                    {tag.replace(/^chat-/, "v")}
                    {tag === latest.tag && <span className="font-geist text-[11px] text-white/55">latest</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="border-t border-white/10">
          {releases.map(({ tag, date, title, summary, changes, body }) => (
            <article
              key={tag}
              id={tag}
              aria-labelledby={`${tag}-title`}
              className="scroll-mt-8 border-b border-white/10 py-6 last:border-b-0"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs">
                <a href={`${project.source}/releases/tag/${tag}`} className={`font-mono font-medium text-white ${linkStyle}`}>
                  {tag.replace(/^chat-/, "v")}
                  <span className="sr-only"> on GitHub</span>
                </a>
                <time dateTime={date} className="text-[11px] tracking-wide text-white/55">
                  {dateFormat.format(new Date(date.length === 10 ? `${date}T12:00:00Z` : date))}
                </time>
              </div>
              <h2 id={`${tag}-title`} className="mt-4 font-medium text-white">{title}</h2>
              {body && (
                <div className="prose prose-invert prose-sm mt-2 max-w-none break-words text-xs leading-relaxed tracking-wide prose-headings:font-medium prose-a:underline-offset-4 prose-pre:overflow-x-auto prose-li:my-0 prose-li:pl-1 [&_li+li]:mt-2 [&_li>p:first-child]:mt-0 [&_li>p:last-child]:mb-0">
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    skipHtml
                    disallowedElements={["img"]}
                    urlTransform={(url) => {
                      const safeUrl = defaultUrlTransform(url);
                      if (!safeUrl || safeUrl.startsWith("#")) return safeUrl;
                      try {
                        return new URL(safeUrl, `${project.source}/blob/${tag}/`).href;
                      } catch {
                        return "";
                      }
                    }}
                  >
                    {body}
                  </Markdown>
                </div>
              )}
              {summary && <p className="mt-2 leading-relaxed tracking-wide">{summary}</p>}
              {changes && (
                <ul className="mt-3 list-disc space-y-2 pl-4 text-xs [&>li]:pl-1 leading-relaxed tracking-wide text-white/60">
                  {changes.map((change) => <li key={change}>{change}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
