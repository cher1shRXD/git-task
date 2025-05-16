import { initializeDataSource } from "@/libs/typeorm/initialize";
import { TaskGroup } from "@/schemas/TaskGroup.entity";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const data = body.data as TaskGroup[];

    const dataSource = await initializeDataSource();
    const taskGroupRepo = dataSource.getRepository(TaskGroup);

    const savedGroups = await taskGroupRepo.save(data, {
      chunk: 30,
      transaction: true,
    });

    return NextResponse.json({ success: true, data: savedGroups });
  } catch (err: unknown) {
    console.error("Failed to save TaskGroups:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save TaskGroups" },
      { status: 500 }
    );
  }
};
