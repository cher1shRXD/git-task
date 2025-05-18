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
    branchList,
    selectedBranch,
    setSelectedBranch,
    addNewBranch,
    deleteTaskGroup,
    isEditing,
    saveData,
    isTrunkBase,
    setIsTrunkBase
  } = useTaskGroups(schedule || null, branches, defaultBranch, repoName, ownerName);

  return (
    <div className="w-full">
      <div className="w-full flex items-center gap-4 mt-8 mb-4 pr-4">
        <p className="text-xl font-jetbrains">작업 추가하기</p>
        <SaveButton saveData={saveData} />
        <div className="flex-1" />
        깃허브 전략:
        <select className="bg-gray-100 p-1 rounded" value={`${isTrunkBase}`} onChange={(e) => setIsTrunkBase(e.target.value === "true" ? true : false)}>
          <option value="false">Git-Flow</option>
          <option value="true">Trunk-Base</option>
        </select>
      </div>
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
