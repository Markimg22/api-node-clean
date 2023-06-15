import { DbLoadTasks } from '@/data/usecases';
import { LoadTasks } from '@/domain/usecases';
import {
  makeRepositories,
  makeFormatDatetimeToFormattedDate,
} from '@/main/factories';

export const makeDbLoadTasks = (): LoadTasks => {
  const { loadTasksRepository } = makeRepositories();
  return new DbLoadTasks(
    loadTasksRepository,
    makeFormatDatetimeToFormattedDate()
  );
};
