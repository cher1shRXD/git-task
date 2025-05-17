import { initializeDataSource } from "@/libs/typeorm/initialize";
import { Schedule } from "@/schemas/Schedule.entity";
import { instanceToPlain } from "class-transformer";

export const getScheduleData = async (_: string, repositoryName: string) => {
  const dataSource = await initializeDataSource();
  const scheduleRepository = dataSource.getRepository(Schedule);

  let data = await scheduleRepository.findOne({
    where: { repositoryName },
    relations: {
      taskGroups: {
        tasks: true,
      },
    },
  });

  if (!data) {
    const newSchedule = new Schedule();
    newSchedule.repositoryName = repositoryName;
    newSchedule.taskGroups = [];
    data = await scheduleRepository.save(newSchedule);
  }

  return instanceToPlain(data);
};
