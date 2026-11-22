import Link from "next/link";
import { notFound } from "next/navigation";
import { changelogs } from "../../../../content/projects/changelogs";

export const dynamicParams = false;

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
  timeZone: "UTC",
});

const linkStyle = "rounded-sm hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";

export default async function ChangelogPage({ params }) {
  const { slug } = await params;
  const project = changelogs[slug];

  if (!project) notFound();

  const [latest] = project.releases;

  return (
    <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10 font-geist text-[#ededed] md:px-10 md:pt-16">
      <header className="border-b border-white/15 pb-8">
        <Link href={`/projects/${slug}`} className={`font-mono text-sm text-[#a3a3a3] ${linkStyle}`}>
          {project.name}
        </Link>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Changelog</h1>
        <p className="mt-3 text-base leading-relaxed text-[#a3a3a3]">{project.description}</p>
      </header>

      <div className="grid gap-9 pt-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-12 md:pt-10">
        <nav aria-label="Release versions" className="self-start rounded-lg border border-white/15 p-4 md:sticky md:top-6">
          <h2 className="mb-2 text-sm font-medium text-[#a3a3a3]">Versions</h2>
          <ul className="flex flex-wrap gap-x-4 md:flex-col md:gap-x-0">
            {project.releases.map(({ tag }) => (
              <li key={tag}>
                <a href={`#${tag}`} className={`inline-flex min-h-9 items-center gap-2 font-mono text-sm ${linkStyle}`}>
                  {tag.replace(/^chat-/, "v")}
                  {tag === latest.tag && <span className="font-geist text-xs text-[#a3a3a3]">Latest</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          {project.releases.map(({ tag, date, title, summary, changes }) => (
            <article
              key={tag}
              id={tag}
              aria-labelledby={`${tag}-title`}
              className="mb-8 scroll-mt-6 border-b border-white/15 pb-8 last:mb-0 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-sm">
                <a href={`${project.source}/releases/tag/${tag}`} className={`underline decoration-white/35 underline-offset-4 ${linkStyle}`}>
                  {tag.replace(/^chat-/, "v")}
                </a>
                <time dateTime={date} className="text-[#a3a3a3]">{dateFormat.format(new Date(date))}</time>
              </div>
              <h2 id={`${tag}-title`} className="mt-3 text-xl font-semibold tracking-tight">{title}</h2>
              {summary && <p className="mt-3 leading-relaxed text-white/80">{summary}</p>}
              {changes && (
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-white/80 marker:text-[#a3a3a3]">
                  {changes.map((change) => <li key={change}>{change}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
