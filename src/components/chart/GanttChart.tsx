"use client";

import { GanttChartProps } from "@/types/props/GanttChartProps";
import { getDateRange } from "@/utilities/getDateRange";
import { differenceInDays, format } from "date-fns";

const GanttChart = ({ taskGroups }: GanttChartProps) => {
  let minDate = new Date(taskGroups[0].tasks[0].startDate);
  let maxDate = new Date(taskGroups[0].tasks[0].endDate);

  taskGroups.forEach(group =>
    group.tasks.forEach(task => {
      const start = new Date(task.startDate);
      const end = new Date(task.endDate);
      if (start < minDate) minDate = start;
      if (end > maxDate) maxDate = end;
    })
  );

  const dateRange = getDateRange(minDate, maxDate);
  const cellWidth = 52;

  return (
    <div className="overflow-auto bg-white text-sm">
      <table className="table-fixed border-collapse min-w-max">
        <thead>
          <tr className="font-jetbrains font-medium">
            <th className="w-32 border border-gray-300 bg-gray-100 p-2 text-left">Group</th>
            <th className="w-40 border border-gray-300 bg-gray-100 p-2 text-left">Task</th>
            {dateRange.map((date, i) => (
              <th
                key={i}
                className="border border-gray-300 bg-gray-50 text-xs font-normal"
                style={{ width: `${cellWidth}px` }}
              >
                {format(date, "MM/dd")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {taskGroups.map((group, gIdx) =>
            group.tasks.map((task, tIdx) => {
              const taskStart = new Date(task.startDate);
              const taskEnd = new Date(task.endDate);
              const offset = differenceInDays(taskStart, minDate);
              const span = differenceInDays(taskEnd, taskStart) + 1;

              return (
                <tr key={`${gIdx}-${tIdx}`} className="h-10 relative">
                  {tIdx === 0 && (
                    <td
                      className="border border-gray-300 px-2 py-1 align-center"
                      rowSpan={group.tasks.length}
                    >
                      {group.taskGroupName}
                    </td>
                  )}

                  <td className="border border-gray-300 px-2 py-1">{task.taskName}</td>

                  {dateRange.map((_, i) => (
                    <td key={i} className="border border-gray-300 relative p-0">
                      {i === offset && (
                        <div
                          className="absolute top-2 left-2 h-6 bg-blue-500 rounded text-white text-xs px-2 flex items-center"
                          style={{
                            width: `${span * cellWidth - 16}px`,
                            zIndex: 1,
                          }}
                          title={`${task.taskName} (${task.startDate} ~ ${task.endDate})`}
                        >
                          {task.taskName}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GanttChart