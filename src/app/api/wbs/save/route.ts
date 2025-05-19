import { initializeDataSource } from "@/libs/typeorm/initialize";
import { Schedule } from "@/schemas/Schedule.entity";
import { TaskGroup } from "@/schemas/TaskGroup.entity";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { data } = body;
    console.log(data);

    const dataSource = await initializeDataSource();
    const scheduleRepository = dataSource.getRepository(Schedule);
    const schedule = await scheduleRepository.findOneOrFail({
      where: { repositoryName: data.repositoryName },
      relations: {
        taskGroups: {
          tasks: true,
        },
    }});
    const taskGroupRepository = dataSource.getRepository(TaskGroup);

    schedule.isTrunkBase = data.isTrunkBase;

    for (const group of data.taskGroups) {
      group.schedule = schedule;

      console.log(group.tasks)
      if (Array.isArray(group.tasks)) {
        for (const task of group.tasks) {
          task.taskGroup = group;
          
        }
      }
    }

    await taskGroupRepository.save(data.taskGroups, {
      chunk: 30,
      transaction: true,
    });

    console.log(schedule);

    return NextResponse.json({ success: true, data: schedule });
  } catch (err: unknown) {
    console.error("Failed to save TaskGroups:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save TaskGroups" },
      { status: 500 }
    );
  }
};
