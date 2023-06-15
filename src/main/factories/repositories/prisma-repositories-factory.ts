import { client } from '@/infra/helpers';
import {
  PrismaCheckUserByEmailRepository,
  PrismaCreateTaskRepository,
  PrismaCreateUserRepository,
  PrismaDeleteTaskRepository,
  PrismaLoadPerformanceRepository,
  PrismaLoadTasksRepository,
  PrismaLoadUserByEmailRepository,
  PrismaUpdatePerformanceRepository,
  PrismaUpdateTaskRepository,
  PrismaLoadCountInfosTasksRepository,
  PrismaLoadUserByIdRepository,
  PrismaLoadUserByGoogleIdRepository,
} from '@/infra/repositories';

type RepositoriesType = {
  checkUserByEmailRepository: PrismaCheckUserByEmailRepository;
  updateTaskRepository: PrismaUpdateTaskRepository;
  updatePerformanceRepository: PrismaUpdatePerformanceRepository;
  loadUserByEmailRepository: PrismaLoadUserByEmailRepository;
  loadTasksRepository: PrismaLoadTasksRepository;
  loadPerformanceRepository: PrismaLoadPerformanceRepository;
  deleteTaskRepository: PrismaDeleteTaskRepository;
  createUserRepository: PrismaCreateUserRepository;
  createTaskRespository: PrismaCreateTaskRepository;
  loadCountInfosTasksRepository: PrismaLoadCountInfosTasksRepository;
  loadUserByIdRepository: PrismaLoadUserByIdRepository;
  loadUserByGoogleIdRepository: PrismaLoadUserByGoogleIdRepository;
};

export const makeRepositories = (): RepositoriesType => {
  return {
    checkUserByEmailRepository: new PrismaCheckUserByEmailRepository(client),
    updateTaskRepository: new PrismaUpdateTaskRepository(client),
    updatePerformanceRepository: new PrismaUpdatePerformanceRepository(client),
    loadUserByEmailRepository: new PrismaLoadUserByEmailRepository(client),
    loadTasksRepository: new PrismaLoadTasksRepository(client),
    loadPerformanceRepository: new PrismaLoadPerformanceRepository(client),
    deleteTaskRepository: new PrismaDeleteTaskRepository(client),
    createUserRepository: new PrismaCreateUserRepository(client),
    createTaskRespository: new PrismaCreateTaskRepository(client),
    loadCountInfosTasksRepository: new PrismaLoadCountInfosTasksRepository(
      client
    ),
    loadUserByIdRepository: new PrismaLoadUserByIdRepository(client),
    loadUserByGoogleIdRepository: new PrismaLoadUserByGoogleIdRepository(
      client
    ),
  };
};
