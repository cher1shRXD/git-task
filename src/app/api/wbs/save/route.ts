import { initializeDataSource } from "@/libs/typeorm/initialize";
import { Schedule } from "@/schemas/Schedule.entity";
import { TaskGroup } from "@/schemas/TaskGroup.entity";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { data } = body as { data: Schedule };
    console.log(body);

    const dataSource = await initializeDataSource();
    const scheduleRepository = dataSource.getRepository(Schedule);
    const originalSchedule = await scheduleRepository.findOneByOrFail({ repositoryName: data.repositoryName });
    const taskGroupRepository = dataSource.getRepository(TaskGroup);

    originalSchedule.isTrunkBase = data.isTrunkBase;

    console.log(originalSchedule);

    const schedule = await scheduleRepository.save(originalSchedule);

    for (const group of data.taskGroups) {
      group.schedule = schedule;

      console.log(group.tasks)
      if (Array.isArray(group.tasks)) {
        for (const task of group.tasks) {
          task.taskGroup = group;
          
        }
      }
    }

    const savedGroups = await taskGroupRepository.save(data.taskGroups, {
      chunk: 30,
      transaction: true,
    });

    const simplified = savedGroups.map(group => ({
      id: group.id,
      taskGroupName: group.taskGroupName,
      tasks: group.tasks?.map(task => ({
        id: task.id,
        taskName: task.taskName,
        startDate: task.startDate,
        endDate: task.endDate,
        connectedBranch: task.connectedBranch,
        worker: task.worker,
        isDone: task.isDone,
      })),
    }));

    return NextResponse.json({ success: true, data: simplified });
  } catch (err: unknown) {
    console.error("Failed to save TaskGroups:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save TaskGroups" },
      { status: 500 }
    );
  }
};
