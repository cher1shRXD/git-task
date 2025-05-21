"use client";

import GanttChart from "./GanttChart";
import { useTaskGroups } from "@/hooks/useTaskGroups";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { ChartControllerProps } from "@/types/props/ChartControllerProps";
import SaveButton from "./SaveButton";

const ChartController = ({ branches, defaultBranch, ownerName, repoName, schedule }: ChartControllerProps) => {
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
    addNewBranch,
    deleteTaskGroup,
    isEditing,
    saveData,
    isTrunkBase,
    setIsTrunkBase,
    canSave,
    availableBranches,
    setForm
  } = useTaskGroups(schedule, branches, defaultBranch, repoName, ownerName);

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between gap-4 mt-8 mb-4 pr-4">
        <p className="text-xl font-jetbrains">작업 추가하기</p>
        <SaveButton saveData={saveData} canSave={canSave} />
      </div>
      <TaskForm
        selectedGroup={selectedGroup}
        form={form}
        handleChange={handleChange}
        handleAddOrUpdate={handleAddOrUpdate}
        handleAddGroup={handleAddGroup}
        taskGroups={taskGroups}
        onSelectGroup={setSelectedGroup}
        addNewBranch={addNewBranch}
        deleteTaskGroup={deleteTaskGroup}
        isEditing={isEditing}
        isTrunkBase={isTrunkBase}
        setIsTrunkBase={setIsTrunkBase}
        availableBranches={availableBranches}
        setForm={setForm}
      />

      <p className="mb-2 mt-8 text-xl font-jetbrains">간트 차트</p>
      <GanttChart 
        taskGroups={taskGroups} 
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />

      <p className="mb-2 mt-8 text-xl font-jetbrains">작업 목록</p>
      <TaskList
        taskGroups={taskGroups}
        
        onSelectGroup={setSelectedGroup}
        selectedGroup={selectedGroup}
      />

      
    </div>
  );
};

export default ChartController;
