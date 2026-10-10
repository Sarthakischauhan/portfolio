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

function recentWindow(contributions, months = 6) {
  const cutoff = new Date();
  cutoff.setMonth(cutoff.getMonth() - months);
  const cutoffKey = cutoff.toISOString().slice(0, 10);

  return contributions.filter((day) => day.date >= cutoffKey);
}

export async function getGithubContributions(username, year, months = 6) {
  try {
    const contributions = await getCachedContributions(username, year);
    return recentWindow(contributions, months);
  } catch {
    return [];
  }
}
