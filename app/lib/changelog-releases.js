import { unstable_cache } from "next/cache";

const releaseTags = {
  symphony: /^v\d+\.\d+\.\d+$/,
  "chat-sdk": /^chat-\d+\.\d+\.\d+$/,
};

const getPublishedReleases = unstable_cache(
  async (slug, source) => {
    const endpoint = `https://api.github.com/repos${new URL(source).pathname}/releases`;
    const releases = [];

    for (let page = 1; ; page += 1) {
      const response = await fetch(`${endpoint}?per_page=100&page=${page}`, {
        headers: { Accept: "application/vnd.github+json" },
        signal: AbortSignal.timeout(5000),
      });

      if (!response.ok) {
        throw new Error(`GitHub Releases returned ${response.status} for ${slug}`);
      }

      const batch = await response.json();

      for (const release of batch) {
        if (release.draft || release.prerelease || !release.published_at ||
            !releaseTags[slug].test(release.tag_name)) continue;

        releases.push({
          tag: release.tag_name,
          date: release.published_at,
          title: release.name?.trim() || release.tag_name,
          body: release.body,
        });
      }

      if (batch.length < 100) break;
    }

    return releases.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  },
  ["published-changelog-releases"],
  { revalidate: 3600 },
);

export async function getChangelogReleases(slug, project) {
  try {
    const releases = await getPublishedReleases(slug, project.source);
    return releases.length ? releases : project.releases;
  } catch (error) {
    console.warn(`Using bundled release notes for ${slug}:`, error.message);
    return project.releases;
  }
}
