"use client"

import { GanttChartProps } from "@/types/props/GanttChartProps";
import { getDateRange } from "@/utilities/getDateRange";
import { differenceInDays, format } from "date-fns";
import { Edit, Trash } from "lucide-react";

const GanttChart = ({ taskGroups, onEdit, onDelete }: GanttChartProps) => {
  const allTasks = taskGroups.flatMap(group => group.tasks);

  if (allTasks.length === 0) return <p className="text-gray-500 p-4">No tasks to display.</p>;

  const minDate = allTasks.reduce(
    (min, task) => (new Date(task.startDate) < min ? new Date(task.startDate) : min),
    new Date(allTasks[0].startDate)
  );

  const maxDate = allTasks.reduce(
    (max, task) => (new Date(task.endDate) > max ? new Date(task.endDate) : max),
    new Date(allTasks[0].endDate)
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
                      className="border border-gray-300 px-2 py-1 align-middle"
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
                          className={`absolute top-2 left-2 h-6 ${task.isDone ? "bg-gradient-to-br from-blue-500 to-purple-500" : "bg-gray-400"} rounded text-white text-xs px-2 flex items-center gap-1`}
                          style={{
                            width: `${span * cellWidth - 16}px`,
                            zIndex: 1,
                          }}
                          title={`${task.taskName} (${task.startDate} ~ ${task.endDate})`}
                        >
                          <p className="whitespace-nowrap overflow-hidden text-ellipsis">{task.taskName}</p>
                          <div className="flex-1" />
                          <Edit onClick={() => onEdit(group.taskGroupName, tIdx)} size={14} className="cursor-pointer" />
                          <Trash onClick={() => onDelete(group.taskGroupName, tIdx)} size={14} className="cursor-pointer" />
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

export default GanttChart;
