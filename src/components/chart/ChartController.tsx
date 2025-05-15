"use client";

import { TaskGroup } from "@/types/chart/TaskGroup";
import GanttChart from "./GanttChart";
import { Task } from "@/types/chart/Task";
import { useTaskGroups } from "@/hooks/useTaskGroups";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

const initialData: TaskGroup[] = [
  {
    taskGroupName: "Frontend",
    tasks: [
      {
        taskName: "UI Design",
        startDate: "2025-05-01",
        endDate: "2025-05-05",
        connectedBranch: "feature/ui",
        worker: "Alice",
      },
      {
        taskName: "React Setup",
        startDate: "2025-05-06",
        endDate: "2025-05-10",
        connectedBranch: "feature/setup",
        worker: "Bob",
      },
    ],
  },
  {
    taskGroupName: "Backend",
    tasks: [
      {
        taskName: "API Design",
        startDate: "2025-05-03",
        endDate: "2025-05-08",
        connectedBranch: "feature/api",
        worker: "Charlie",
      },
    ],
  },
];

const emptyTask: Task = {
  taskName: "",
  startDate: "",
  endDate: "",
  connectedBranch: "",
  worker: "",
};

const ChartController = () => {
  const {
    taskGroups,
    selectedGroup,
    form,
    handleChange,
    handleAddOrUpdate,
    handleEditTask,
    handleDeleteTask,
    handleAddGroup,
    setSelectedGroup,
  } = useTaskGroups(initialData);

  return (
    <div className="w-full p-4 space-y-6">
      <TaskForm
        selectedGroup={selectedGroup}
        form={form}
        handleChange={handleChange}
        handleAddOrUpdate={handleAddOrUpdate}
        handleAddGroup={handleAddGroup}
      />

      {/* Gantt 차트 */}
      <GanttChart taskGroups={taskGroups} />

      <TaskList
        taskGroups={taskGroups}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onSelectGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
      />
    </div>
  );
};

export default ChartController;
