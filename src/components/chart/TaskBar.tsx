import { TaskBarProps } from '@/types/props/TaskBarProps';

const TaskBar = ({ taskName, startPercent, durationPercent }: TaskBarProps) => {
  return (
    <div className="relative h-6 my-1">
      <div
        className="absolute h-full bg-blue-500 rounded text-white text-xs px-2 flex items-center"
        style={{ left: `${startPercent}%`, width: `${durationPercent}%` }}
        title={taskName}
      >
        {taskName}
      </div>
    </div>
  );
};

export default TaskBar