import { TaskListProps } from "@/types/props/TaskListProps";

const TaskList = ({
  taskGroups,
  onEdit,
  onDelete,
  onSelectGroup,
  selectedGroup,
}: TaskListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">그룹</th>
            <th className="border p-2">작업명</th>
            <th className="border p-2">시작일</th>
            <th className="border p-2">종료일</th>
            <th className="border p-2">브랜치</th>
            <th className="border p-2">작업자</th>
            <th className="border p-2">작업</th>
          </tr>
        </thead>
        <tbody>
          {taskGroups.map((group) =>
            group.tasks.map((task, idx) => (
              <tr key={`${group.taskGroupName}-${idx}`}>
                {idx === 0 && (
                  <td
                    rowSpan={group.tasks.length}
                    className="border p-2 align-top bg-gray-100"
                    onClick={() => onSelectGroup(group.taskGroupName)}
                    style={{ cursor: "pointer" }}
                  >
                    {group.taskGroupName}
                    {selectedGroup === group.taskGroupName && " ✅"}
                  </td>
                )}
                <td className="border p-2">{task.taskName}</td>
                <td className="border p-2">{task.startDate}</td>
                <td className="border p-2">{task.endDate}</td>
                <td className="border p-2">{task.connectedBranch}</td>
                <td className="border p-2">{task.worker}</td>
                <td className="border p-2">
                  <button
                    onClick={() => onEdit(group.taskGroupName, idx)}
                    className="text-blue-500 mr-2"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => onDelete(group.taskGroupName, idx)}
                    className="text-red-500"
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
