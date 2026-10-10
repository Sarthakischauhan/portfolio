"use client";

import { ActivityCalendar } from "react-activity-calendar";

const theme = {
  dark: ["#3a3a3a", "#5c5c5c", "#808080", "#b3b3b3", "#ffffff"],
};

export default function GithubCalendar({ activity = [] }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="opacity-60 font-medium text-section-heading">
        LAST 3 MONTHS
      </h4>
      <div className="github-calendar-scroll w-full overflow-x-auto text-white/60">
        {activity.length > 0 ? (
          <ActivityCalendar
            data={activity}
            className="github-activity-calendar"
            colorScheme="dark"
            theme={theme}
            blockSize={11}
            blockMargin={3}
            blockRadius={2}
            fontSize={10}
            showColorLegend={false}
            showTotalCount={false}
            showWeekdayLabels={false}
          />
        ) : null}
      </div>
    </div>
  );
}
