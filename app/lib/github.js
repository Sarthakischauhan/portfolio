import { unstable_cache } from "next/cache";

const getCachedContributions = unstable_cache(
  async (username, year) => {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`
    );

    if (!response.ok) {
      throw new Error(`GitHub contributions request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.contributions ?? [];
  },
  ["github-contributions"],
  { revalidate: 3600 }
);

export async function getGithubContributions(username, year) {
  try {
    return await getCachedContributions(username, year);
  } catch {
    return [];
  }
}
