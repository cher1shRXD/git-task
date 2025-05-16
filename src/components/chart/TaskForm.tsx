"use client";

import { TaskFormProps } from "@/types/props/TaskFormProps";
import { Github, Trash } from "lucide-react";
import { useState } from "react";

const TaskForm = ({
  selectedGroup,
  form,
  handleChange,
  handleAddOrUpdate,
  handleAddGroup,
  taskGroups,
  onSelectGroup,
  branchList,
  onSelectBranch,
  selectedBranch,
  addNewBranch,
  deleteTaskGroup,
  isEditing
}: TaskFormProps) => {
  const [newGroupName, setNewGroupName] = useState("");
  const [newBranchName, setNewBranchName] = useState("");

  return (
    <div className="flex items-start mb-4 gap-4 mr-4 flex-wrap">
      <div className="flex flex-col gap-2">
        <select value={selectedGroup} onChange={(e) => onSelectGroup(e.target.value)} className="border border-gray-300 p-2 rounded disabled:text-gray-400 disabled:border-gray-200" disabled={isEditing || taskGroups.length === 0}>
          {
            taskGroups.map((item) => (
              <option key={item.taskGroupName} value={item.taskGroupName}>{item.taskGroupName}</option>
            ))
          }
        </select>
        <input
          name="taskName"
          placeholder="작업명"
          value={form.taskName}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
        <div className="flex items-center gap-1">
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
          ~
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        
        <select className="border border-gray-300 p-2 rounded" onChange={(e) => onSelectBranch(e.target.value)} value={selectedBranch}>
          {
            branchList.map((item) => (
              <option key={item.name} value={item.name}>{item.name}</option>
            ))
          }
        </select>

        <input
          name="worker"
          placeholder="담당자"
          value={form.worker}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-400 text-white px-2 py-1 rounded"
        >
          저장
        </button>
      </div>

      <div className="w-[1px] h-69 bg-gray-300" />
      
      <div className="w-80 h-69 overflow-scroll">
        {
          taskGroups.length > 0 ? taskGroups.map((item) => (
            <div key={item.taskGroupName} className="flex items-center gap-1">
              <p className="text-lg">{item.taskGroupName}</p>
              <p className="text-sm text-gray-400">·</p>
              <p className="text-sm text-gray-400">{item.tasks.length}개의 작업</p>
              <div className="flex-1" />
              <Trash size={14} color="#fb2c36" className="cursor-pointer" onClick={() => deleteTaskGroup(item.taskGroupName)} />
            </div>
          )) : <p className="text-sm text-gray-400">작업 그룹이 없습니다.</p>
        }
      </div>

      <div className="w-[1px] h-69 bg-gray-300" />

      <div className="w-80 flex flex-col gap-8">
        
        <div className="flex flex-col gap-2">
          <input
            placeholder="새 작업 그룹 이름"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={() => {
              handleAddGroup(newGroupName);
              setNewGroupName("");
            }}
            className="bg-primary text-white px-2 py-1 rounded"
          >
            그룹 추가
          </button>
        </div>
        
        <div className="flex flex-col gap-2">
          <input
            placeholder="새 Github 브랜치 이름"
            value={newBranchName}
            onChange={(e) => setNewBranchName(e.target.value)}
            className="border border-gray-300 p-2 rounded"
          />
          <button
            onClick={() => {
              addNewBranch(newBranchName)
              setNewBranchName("");
            }}
            className="bg-github text-white px-2 py-1 rounded flex items-center justify-center gap-1"
          >
            <Github size={14} /> 브랜치 추가
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default TaskForm;