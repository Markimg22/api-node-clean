import { DbUpdateTask } from '@/data/usecases';
import { UpdateTask } from '@/domain/usecases';
import { makeRepositories } from '@/main/factories';

export const makeDbUpdateTask = (): UpdateTask => {
  const { updateTaskRepository } = makeRepositories();
  return new DbUpdateTask(updateTaskRepository);
};
