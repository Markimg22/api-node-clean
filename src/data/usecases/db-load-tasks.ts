import { LoadTasks } from '@/domain/usecases';
import { LoadTasksRepository } from '@/data/protocols/repositories';
import { Format } from '@/utils/protocols';

export class DbLoadTasks implements LoadTasks {
  constructor(
    private readonly loadTasksRepository: LoadTasksRepository,
    private readonly formatDatetimeToFormattedDate: Format<
      Date | string,
      string
    >
  ) {}

  async load(userId: LoadTasks.Params): Promise<LoadTasks.Result> {
    const tasks = await this.loadTasksRepository.load(userId);
    return tasks.map((task) => {
      return {
        ...task,
        endDate: task.endDate
          ? this.formatDatetimeToFormattedDate.format(task.endDate)
          : undefined,
        startDate: task.startDate
          ? this.formatDatetimeToFormattedDate.format(task.startDate)
          : undefined,
      };
    });
  }
}
