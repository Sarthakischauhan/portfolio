"use client";

import { ActivityCalendar } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";

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

export default function GithubCalendar({ activity = [] }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="opacity-60 font-medium text-section-heading">
        CONTRIBUTIONS IN THE LAST YEAR
      </h4>
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
    </div>
  );
}
