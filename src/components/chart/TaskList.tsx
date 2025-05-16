import { TaskListProps } from "@/types/props/TaskListProps";

const TaskList = ({
  taskGroups,
}: TaskListProps) => {
  return (
    <div className="overflow-x-auto mr-4 mb-4">
      <table className="table-auto w-full max-w-250 border-collapse border border-gray-300">
        <thead>
          <tr className="font-jetbrains">
            <th className="border border-gray-300 p-2">그룹</th>
            <th className="border border-gray-300 p-2">작업명</th>
            <th className="border border-gray-300 p-2">시작일</th>
            <th className="border border-gray-300 p-2">종료일</th>
            <th className="border border-gray-300 p-2">브랜치</th>
            <th className="border border-gray-300 p-2">담당자</th>
          </tr>
        </thead>
        <tbody>
          {taskGroups.map((group) =>
            group.tasks.map((task, idx) => (
              <tr key={`${group.taskGroupName}-${idx}`}>
                {idx === 0 && (
                  <td
                    rowSpan={group.tasks.length}
                    className="border border-gray-300 p-2 align-center bg-gray-100"
                    style={{ cursor: "pointer" }}
                  >
                    {group.taskGroupName}
                  </td>
                )}
                <td className="border border-gray-300 p-2 text-nowrap">
                  <span className="">{task.taskName}</span>
                  {/* <span className="text-end">
                    <button
                      onClick={() => onEdit(group.taskGroupName, idx)}
                      className="text-blue-500 mr-2 cursor-pointer"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onDelete(group.taskGroupName, idx)}
                      className="text-red-500 cursor-pointer"
                    >
                      삭제
                    </button>
                  </span> */}
                </td>
                <td className="border border-gray-300 p-2 text-nowrap">{task.startDate}</td>
                <td className="border border-gray-300 p-2 text-nowrap">{task.endDate}</td>
                <td className="border border-gray-300 p-2 text-nowrap">{task.connectedBranch}</td>
                <td className="border border-gray-300 p-2 text-nowrap">{task.worker}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
