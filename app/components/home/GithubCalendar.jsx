"use client";

import { ActivityCalendar } from "react-activity-calendar";

const theme = {
  dark: ["#292929", "#454545", "#666666", "#999999", "#f5f5f5"],
};

export default function GithubCalendar({ activity = [] }) {
  return (
    <div className="github-calendar-scroll w-full overflow-x-auto text-white/60">
      {activity.length > 0 ? (
        <ActivityCalendar
          data={activity}
          className="github-activity-calendar"
          colorScheme="dark"
          theme={theme}
          blockSize={8}
          blockMargin={2}
          blockRadius={1}
          fontSize={9}
          showColorLegend={false}
          showTotalCount={false}
          showWeekdayLabels={false}
          style={{ width: "100%" }}
        />
      ) : null}
    </div>
  );
}
