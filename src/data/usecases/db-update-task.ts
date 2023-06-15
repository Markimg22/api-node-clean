import { UpdateTask } from '@/domain/usecases';
import { UpdateTaskRepository } from '@/data/protocols/repositories';

export class DbUpdateTask implements UpdateTask {
  constructor(private readonly updateTaskRepository: UpdateTaskRepository) {}

  async update(data: UpdateTask.Params): Promise<UpdateTask.Result> {
    const taskUpdated = await this.updateTaskRepository.update(data);
    return taskUpdated;
  }
}
