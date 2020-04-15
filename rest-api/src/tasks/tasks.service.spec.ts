import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';

const mockUser = { id: 420, username: 'Test User' };

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('TasksService', () => {
  let tasksService;
  let taskRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    taskRepository = module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from the repo', async () => {
      // arrange
      const expectedValue = 'some value';
      const filters: GetTasksFilterDto = {
        status: TaskStatus.OPEN,
        search: 'some search',
      };
      taskRepository.getTasks.mockResolvedValue(expectedValue);

      // act
      const result = await tasksService.getTasks(filters, mockUser);

      // assert
      expect(taskRepository.getTasks).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedValue);
    });
  });

  describe('getTaskById', () => {
    it('calls the repo and successfully retrieves and returns the task', async () => {
      // arrange
      const expectedTask = {
        title: 'test task',
        description: 'test description',
      };
      taskRepository.findOne.mockResolvedValue(expectedTask);

      // act
      const result = await tasksService.getTaskById(1, mockUser);

      // assert
      expect(result).toEqual(expectedTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('throws an error when task is not found', () => {
      // arrange
      taskRepository.findOne.mockResolvedValue(null);

      // act
      const result = tasksService.getTaskById(1, mockUser);

      // assert
      expect(result).rejects.toThrow();
    });
  });
});
