import { useEffect, useState } from "react";
import { TaskGroup } from "@/types/chart/TaskGroup";
import { Task } from "@/types/chart/Task";
import { GitHubBranch } from "@/types/github/GitHubBranch";

const emptyTask: Task = {
  taskName: "",
  startDate: "",
  endDate: "",
  connectedBranch: "",
  worker: "",
};

export const useTaskGroups = (initialData: TaskGroup[], branches: GitHubBranch[]) => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(initialData);
  const [selectedGroup, setSelectedGroup] = useState<string>(
    initialData[0]?.taskGroupName || ""
  );
  const [form, setForm] = useState<Task>(emptyTask);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [branchList, setBranchList] = useState(branches);
  const [selectedBranch, setSelectedBranch] = useState(branches[0].name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value, connectedBranch: selectedBranch });
  };

  const handleAddOrUpdate = () => {
    if (!form.taskName || !form.startDate || !form.endDate) return;
    setTaskGroups((prev) =>
      prev.map((group) => {
        if (group.taskGroupName !== selectedGroup) return group;
        const updatedTasks =
          editIndex !== null
            ? group.tasks.map((t, i) => (i === editIndex ? form : t))
            : [...group.tasks, form];
        return { ...group, tasks: updatedTasks, taskGroupName: selectedGroup };
      })
    );
    setForm(emptyTask);
    setEditIndex(null);
  };

  const handleDeleteTask = (groupName: string, index: number) => {
    setTaskGroups((prev) =>
      prev.map((group) =>
        group.taskGroupName === groupName
          ? { ...group, tasks: group.tasks.filter((_, i) => i !== index) }
          : group
      )
    );
    if (selectedGroup === groupName && editIndex === index) {
      setForm(emptyTask);
      setEditIndex(null);
    }
  };

  const handleEditTask = (groupName: string, index: number) => {
    const group = taskGroups.find((g) => g.taskGroupName === groupName);
    if (!group) return;
    setSelectedGroup(groupName);
    setForm(group.tasks[index]);
    setEditIndex(index);
  };

  const handleAddGroup = (groupName: string) => {
    if (!groupName.trim()) return;
    if (taskGroups.find((g) => g.taskGroupName === groupName)) return;
    setTaskGroups([...taskGroups, { taskGroupName: groupName, tasks: [] }]);
    setSelectedGroup(groupName);
  };

  const addNewBranch = (name: string) => {
    setBranchList(prev => ([...prev, { name, protected: false }]))
  }

  const deleteTaskGroup = (taskGroupName: string) => {
    setTaskGroups(prev => prev.filter((item) => item.taskGroupName !== taskGroupName));
  }

  return {
    taskGroups,
    selectedGroup,
    form,
    editIndex,
    setSelectedGroup,
    setForm,
    handleChange,
    handleAddOrUpdate,
    handleDeleteTask,
    handleEditTask,
    handleAddGroup,
    selectedBranch,
    setSelectedBranch,
    branchList,
    addNewBranch,
    deleteTaskGroup,
    isEditing: editIndex === null ? false: true
  };
};