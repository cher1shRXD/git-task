"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Task } from "@/types/schedule/Task";
import { GitHubBranch } from "@/types/github/GitHubBranch";
import { useCreateBranch } from "./useCreateBranch";
import { toast } from "@/components/provider/ToastProvider";
import axios from "axios";
import { Schedule } from "@/types/schedule/Schedule";
import { TaskGroup } from "@/types/schedule/TaskGroup";

const emptyTask: Task = {
  taskName: "",
  startDate: "",
  endDate: "",
  connectedBranch: "브랜치 선택",
  worker: "",
  isDone: false
};

export const useTaskGroups = (
  initialData: Schedule | null,
  branches: GitHubBranch[],
  defaultBranch?: string,
  repoName?: string,
  ownerName?: string
) => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("");
  const [form, setForm] = useState<Task>(emptyTask);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const createBranch = useCreateBranch();
  const [isTrunkBase, setIsTrunkBase] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [localBranches, setLocalBranches] = useState<GitHubBranch[]>(branches);

  useEffect(() => {
    setLocalBranches(branches);
  }, [branches]);

  const availableBranches = useMemo(() => {
    if (!localBranches || localBranches.length === 0) return [];

    const usedBranches = new Set(
      taskGroups
        .flatMap(group => group.tasks)
        .map(task => task.connectedBranch)
        .filter(branch => branch && branch !== "브랜치 선택")
    );

    return localBranches
      .filter(branch => branch.name !== defaultBranch)
      .filter(branch => !usedBranches.has(branch.name));
  }, [localBranches, taskGroups, defaultBranch]);

  useEffect(() => {
    if (initialData) {
      setTaskGroups(initialData.taskGroups);
      setSelectedGroup(
        initialData.taskGroups.length > 0
          ? initialData.taskGroups[0].taskGroupName
          : ""
      );
      setIsTrunkBase(initialData.isTrunkBase || false);
    }
  }, [initialData]);

  useEffect(() => {
    const nextBranch = availableBranches[0]?.name || "브랜치 선택";
    setForm(prev => ({ ...prev, connectedBranch: nextBranch }));
  }, [availableBranches]);

  useEffect(() => {
    setCanSave(true);
  }, [isTrunkBase, taskGroups]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddOrUpdate = () => {
    const { taskName, worker, startDate, endDate, connectedBranch } = form;

    if (
      !taskName.trim() ||
      !worker.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !connectedBranch ||
      connectedBranch === "브랜치 선택"
    ) {
      toast.warning("모든 필드를 채워주세요.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.warning("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }

    setTaskGroups(prev =>
      prev.map(group => {
        if (group.taskGroupName !== selectedGroup) return group;

        const updatedTasks =
          editIndex !== null
            ? group.tasks.map((t, i) => (i === editIndex ? form : t))
            : [...group.tasks, form];

        return { ...group, tasks: updatedTasks };
      })
    );

    setForm(emptyTask);
    setEditIndex(null);
  };

  const handleDeleteTask = (groupName: string, index: number) => {
    setTaskGroups(prev =>
      prev.map(group =>
        group.taskGroupName === groupName
          ? {
              ...group,
              tasks: group.tasks.filter((_, i) => i !== index)
            }
          : group
      )
    );

    if (selectedGroup === groupName && editIndex === index) {
      setForm(emptyTask);
      setEditIndex(null);
    }
  };

  const handleEditTask = (groupName: string, index: number) => {
    const group = taskGroups.find(g => g.taskGroupName === groupName);
    if (!group) return;

    setSelectedGroup(groupName);
    setForm(group.tasks[index]);
    setEditIndex(index);
  };

  const handleAddGroup = (groupName: string) => {
    if (!groupName.trim()) return;

    if (taskGroups.find(g => g.taskGroupName === groupName)) {
      toast.warning("이미 존재하는 그룹 이름입니다.");
      return;
    }

    setTaskGroups([...taskGroups, { taskGroupName: groupName, tasks: [] }]);
    setSelectedGroup(groupName);
  };

  const addNewBranch = async (name: string) => {
    if (!defaultBranch || !repoName || !ownerName) {
      toast.error("브랜치 생성에 필요한 정보가 부족합니다.");
      return;
    }

    try {
      const data = await createBranch(ownerName, repoName, defaultBranch, name);
      if (data.success) {
        toast.success("브랜치 생성 성공");

        setForm(prev => ({ ...prev, connectedBranch: name }));

        setLocalBranches(prev => [...prev, { name, protected: false }]);
      }
    } catch {
      toast.error("브랜치 생성 실패");
    }
  };

  const deleteTaskGroup = (taskGroupName: string) => {
    setTaskGroups(prev =>
      prev.filter(item => item.taskGroupName !== taskGroupName)
    );

    if (selectedGroup === taskGroupName) {
      const nextGroup =
        taskGroups.find(g => g.taskGroupName !== taskGroupName)?.taskGroupName ||
        "";
      setSelectedGroup(nextGroup);
      setForm(emptyTask);
      setEditIndex(null);
    }
  };

  const saveData = useCallback(async () => {
    if (!repoName || !ownerName) {
      toast.error("저장에 필요한 정보가 부족합니다.");
      return;
    }

    if (!canSave) return;

    try {
      const { data } = await axios.post<{ success: boolean; data: Schedule }>(
        "/api/wbs/save",
        {
          data: {
            repositoryName: `${ownerName}/${repoName}`,
            isTrunkBase,
            taskGroups
          }
        }
      );

      if (data.success) {
        toast.success("변경 사항이 저장되었습니다.");
        setCanSave(false);
      } else {
        toast.error("저장에 실패했습니다.");
      }
    } catch {
      toast.error("변경 사항 저장에 실패했습니다.");
    }
  }, [repoName, ownerName, isTrunkBase, taskGroups, canSave]);

  return {
    taskGroups,
    selectedGroup,
    form,
    setSelectedGroup,
    setForm,
    handleChange,
    handleAddOrUpdate,
    handleDeleteTask,
    handleEditTask,
    handleAddGroup,
    availableBranches,
    addNewBranch,
    deleteTaskGroup,
    isEditing: editIndex !== null,
    saveData,
    isTrunkBase,
    setIsTrunkBase,
    canSave
  };
};
