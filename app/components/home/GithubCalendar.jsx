"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";

const CONTRIBUTIONS_URL =
  "https://github-contributions-api.jogruber.de/v4/sarthakischauhan?y=last";

const theme = {
  dark: ["#3a3a3a", "#5c5c5c", "#808080", "#b3b3b3", "#ffffff"],
};

function contributionLabel(activity) {
  const date = new Date(`${activity.date}T00:00:00`).toLocaleDateString(
    undefined,
    { month: "short", day: "numeric", year: "numeric" }
  );
  const commits =
    activity.count === 1 ? "1 commit" : `${activity.count} commits`;

  return `${commits} on ${date}`;
}

export default function GithubCalendar({ activity: initialActivity = [] }) {
  const hasContributions = initialActivity.some((day) => day.count > 0);
  const [activity, setActivity] = useState(initialActivity);
  const [settled, setSettled] = useState(hasContributions);

  useEffect(() => {
    if (hasContributions) return undefined;

    let cancelled = false;

    fetch(CONTRIBUTIONS_URL)
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setActivity(data.contributions ?? []);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setSettled(true);
      });

    return () => {
      cancelled = true;
    };
  }, [hasContributions]);

  const total = activity.reduce((sum, day) => sum + (day.count ?? 0), 0);
  const contributions =
    total === 1 ? "1 contribution" : `${total} contributions`;

  if (!settled || total === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="github-calendar-scroll w-full overflow-x-auto text-white/60">
        {activity.length > 0 ? (
          <ActivityCalendar
            data={activity}
            className="github-activity-calendar"
            colorScheme="dark"
            theme={theme}
            blockSize={7}
            blockMargin={2}
            blockRadius={1}
            fontSize={9}
            showColorLegend={false}
            showTotalCount={false}
            showWeekdayLabels={false}
            tooltips={{
              activity: {
                text: contributionLabel,
                hoverRestMs: 0,
                withArrow: true,
              },
            }}
          />
        ) : null}
      </div>
      <p className="text-right font-geist text-[11px] tracking-wide text-white/40">
        {contributions} in the last year
      </p>
    </div>
  );
}
