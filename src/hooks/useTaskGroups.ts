import { useMemo, useState } from "react";
import { Task } from "@/types/schedule/Task";
import { GitHubBranch } from "@/types/github/GitHubBranch";
import { useCreateBranch } from "./useCreateBranch";
import { toast } from "@/components/provider/ToastProvider";
import axios from "axios";
import { Schedule } from "@/types/schedule/Schedule";

const emptyTask: Task = {
  taskName: "",
  startDate: "",
  endDate: "",
  connectedBranch: "",
  worker: "",
  isDone: false
};

export const useTaskGroups = (initialData: Schedule | null, branches: GitHubBranch[], defaultBranch?: string, repoName?: string, ownerName?: string) => {
  const [taskGroups, setTaskGroups] = useState(initialData?.taskGroups || []);
  const [selectedGroup, setSelectedGroup] = useState<string>(
    initialData?.taskGroups[0]?.taskGroupName || ""
  );
  const [form, setForm] = useState<Task>(emptyTask);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [branchList, setBranchList] = useState(branches);
  const [selectedBranch, setSelectedBranch] = useState(branches[0].name);
  const createBranch = useCreateBranch();
  const [isTrunkBase, setIsTrunkBase] = useState(initialData?.isTrunkBase || false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value, connectedBranch: selectedBranch });
  };

  const handleAddOrUpdate = () => {
    if (!form.taskName.trim() || !form.startDate.trim() || !form.endDate.trim() || !form.connectedBranch || !form.worker.trim()) {
      toast.warning("모든 필드를 채워주세요.");
      return;
    }
    if(Number(new Date(form.startDate)) >= Number(new Date(form.endDate))) {
      toast.warning("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }
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

  const addNewBranch = async (name: string) => {
    if(!defaultBranch || !repoName || !ownerName) return;
    try{
      const data = await createBranch(ownerName, repoName, defaultBranch, name);
      if(data.success) {
        setBranchList(prev => ([...prev, { name, protected: false }]));
        toast.success("브랜치 생성 성공");
      }
    }catch{
      toast.error("브랜치 생성 실패");
    }
  }

  const deleteTaskGroup = (taskGroupName: string) => {
    setTaskGroups(prev => prev.filter((item) => item.taskGroupName !== taskGroupName));
  }

  const saveData = async () => {
    if(!repoName || !ownerName) return;
    try{
      await axios.post('/api/wbs/save', {
        data: {
          repositoryName: `${ownerName}/${repoName}`,
          isTrunkBase,
          taskGroups
        }
      });
      toast.success("변경 사항 저장되었습니다.");
    }catch{
      toast.error("변경 사항 저장에 실패했습니다.");
    }
  }

  const availableBranches = () => {
    return useMemo(() => {
      if (!branchList) return [];

      const used = new Set(
        (taskGroups ?? [])
          .flatMap((g) => g.tasks ?? [])
          .map((t) => t.connectedBranch)
          .filter(Boolean)
      );

      return branchList.filter((b) => !used.has(b.name));
    }, [branchList, taskGroups]);
  };


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
    selectedBranch,
    setSelectedBranch,
    branchList: availableBranches().filter((item) => item.name !== defaultBranch),
    addNewBranch,
    deleteTaskGroup,
    isEditing: editIndex === null ? false: true,
    saveData,
    isTrunkBase,
    setIsTrunkBase
  };
};