import { TaskGroupRowProps } from "@/types/props/TaskGroupRowProps";
import TaskBar from "./TaskBar";
import { getDateDiff } from "@/utilities/getDateDiff";

const TaskGroupRow = ({ groupName, tasks, chartStart, chartEnd }: TaskGroupRowProps) => {
  const totalDuration = getDateDiff(chartStart, chartEnd);

  return (
    <div className="mb-4">
      <div className="font-bold mb-1">{groupName}</div>
      {tasks.map((task, index) => {
        const taskStart = new Date(task.startDate);
        const taskEnd = new Date(task.endDate);
        const startPercent = (getDateDiff(chartStart, taskStart) / totalDuration) * 100;
        const durationPercent = (getDateDiff(taskStart, taskEnd) / totalDuration) * 100;

        return (
          <TaskBar
            key={index}
            taskName={task.taskName}
            startPercent={startPercent}
            durationPercent={durationPercent}
          />
        );
      })}
    </div>
  );
};

export default TaskGroupRow;