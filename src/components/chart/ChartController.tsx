"use client";

import GanttChart from "./GanttChart";
import { useTaskGroups } from "@/hooks/useTaskGroups";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { ChartControllerProps } from "@/types/props/ChartControllerProps";

const ChartController = ({ branches, defaultBranch, ownerName, repoName }: ChartControllerProps) => {
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
    branchList,
    selectedBranch,
    setSelectedBranch,
    addNewBranch,
    deleteTaskGroup,
    isEditing
  } = useTaskGroups([], branches, defaultBranch, repoName, ownerName);

  return (
    <div className="w-full">
      <p className="mb-2 mt-8 text-xl font-jetbrains">작업 추가하기</p>
      <TaskForm
        selectedGroup={selectedGroup}
        form={form}
        handleChange={handleChange}
        handleAddOrUpdate={handleAddOrUpdate}
        handleAddGroup={handleAddGroup}
        taskGroups={taskGroups}
        onSelectGroup={setSelectedGroup}
        branchList={branchList}
        onSelectBranch={setSelectedBranch}
        selectedBranch={selectedBranch}
        addNewBranch={addNewBranch}
        deleteTaskGroup={deleteTaskGroup}
        isEditing={isEditing}
      />

      <p className="mb-2 mt-8 text-xl font-jetbrains">작업 목록</p>
      <TaskList
        taskGroups={taskGroups}
        
        onSelectGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
      />

      <p className="mb-2 mt-8 text-xl font-jetbrains">간트 차트</p>
      <GanttChart 
        taskGroups={taskGroups} 
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default ChartController;
