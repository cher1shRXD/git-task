"use client";

import { TaskFormProps } from "@/types/props/TaskFormProps";
import { useState } from "react";

const TaskForm = ({
  selectedGroup,
  form,
  handleChange,
  handleAddOrUpdate,
  handleAddGroup,
}: TaskFormProps) => {
  const [newGroupName, setNewGroupName] = useState("");

  return (
    <div className="p-4 border rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Task Form</h2>
      <input
        name="taskName"
        placeholder="Task Name"
        value={form.taskName}
        onChange={handleChange}
        className="border p-1 mr-2"
      />
      <input
        name="startDate"
        type="date"
        value={form.startDate}
        onChange={handleChange}
        className="border p-1 mr-2"
      />
      <input
        name="endDate"
        type="date"
        value={form.endDate}
        onChange={handleChange}
        className="border p-1 mr-2"
      />
      <input
        name="connectedBranch"
        placeholder="Branch"
        value={form.connectedBranch}
        onChange={handleChange}
        className="border p-1 mr-2"
      />
      <input
        name="worker"
        placeholder="Worker"
        value={form.worker}
        onChange={handleChange}
        className="border p-1 mr-2"
      />
      <button
        onClick={handleAddOrUpdate}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        저장
      </button>

      <div className="mt-4">
        <input
          placeholder="New Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          className="border p-1 mr-2"
        />
        <button
          onClick={() => {
            handleAddGroup(newGroupName);
            setNewGroupName("");
          }}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          그룹 추가
        </button>
        <span className="ml-4">현재 그룹: <strong>{selectedGroup}</strong></span>
      </div>
    </div>
  );
};

export default TaskForm;