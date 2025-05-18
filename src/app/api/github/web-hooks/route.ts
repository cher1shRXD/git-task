import { initializeDataSource } from "@/libs/typeorm/initialize";
import { Schedule } from "@/schemas/Schedule.entity";
import { Task } from "@/schemas/Task.entity";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const PRSchema = z.object({
  action: z.literal("closed"),
  pull_request: z.object({
    merged: z.literal(true),
    base: z.object({ ref: z.string() }),
    head: z.object({ ref: z.string() }),
    merged_at: z.string().nullable(),
    number: z.number(),
    html_url: z.string(),
  }),
  repository: z.object({
    full_name: z.string()
  }),
});

export const POST = async (req: NextRequest) => {
  const dataSource = await initializeDataSource();
  const taskRepository = dataSource.getRepository(Task);
  const scheduleRepository = dataSource.getRepository(Schedule);

  try {
    const payload = await req.json();
    const data = PRSchema.parse(payload);

    const {
      pull_request: {
        head: { ref: fromBranch },
        base: { ref: toBranch },
      },
      repository: { full_name: repoFullName },
    } = data;

    const schedule = await scheduleRepository.findOne({
      where: { repositoryName: repoFullName },
      relations: { taskGroups: { tasks: true } },
    });

    if (!schedule) {
      return NextResponse.json(
        { success: false, message: "Schedule not found" },
        { status: 404 },
      );
    }

    const tasksToUpdate: Task[] = [];

    schedule.taskGroups?.forEach((group) => {
      group.tasks?.forEach((task) => {
        if (task.connectedBranch === fromBranch) {
          if((schedule.isTrunkBase && toBranch === "main") || (!schedule.isTrunkBase && toBranch === "develop"))
          task.isDone = true;
          tasksToUpdate.push(task);
        }
      });
    });

    if (tasksToUpdate.length === 0) {
      return NextResponse.json({
        success: true,
        message: `No tasks linked to branch "${fromBranch}". Nothing to update.`,
      });
    }

    await taskRepository.save(tasksToUpdate);


    return NextResponse.json({
      success: true,
      updatedCount: tasksToUpdate.length,
      updatedTaskIds: tasksToUpdate.map((t) => t.id),
    });
  } catch (err) {
    console.error("Webhook processing failed:", err);
    return NextResponse.json(
      { success: false, message: "Webhook processing failed" },
      { status: 500 },
    );
  }
};
