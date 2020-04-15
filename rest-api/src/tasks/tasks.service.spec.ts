import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { NotFoundException } from '@nestjs/common';

const mockUser = { id: 420, username: 'Test User' };

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  delete: jest.fn(),
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
    it('should get all tasks from the repo', async () => {
      // arrange
      const expectedValue = 'some value';
      const filters: GetTasksFilterDto = {
        status: TaskStatus.OPEN,
        search: 'some search',
      };
      taskRepository.getTasks.mockResolvedValue(expectedValue);

      // act
      const getTasksResult = await tasksService.getTasks(filters, mockUser);

      // assert
      expect(taskRepository.getTasks).toHaveBeenCalledTimes(1);
      expect(getTasksResult).toEqual(expectedValue);
    });
  });

  describe('getTaskById', () => {
    it('should get a task by ID', async () => {
      // arrange
      const expectedTask = {
        title: 'test task',
        description: 'test description',
      };
      taskRepository.findOne.mockResolvedValue(expectedTask);

      // act
      const getTaskResult = await tasksService.getTaskById(1, mockUser);

      // assert
      expect(getTaskResult).toEqual(expectedTask);
      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1, userId: mockUser.id },
      });
    });

    it('should throw an error when task is not found', () => {
      // arrange
      taskRepository.findOne.mockResolvedValue(null);

      // act
      const getTaskResult = tasksService.getTaskById(1, mockUser);

      // assert
      expect(getTaskResult).rejects.toThrow();
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      // arrange
      const createTaskDto = {
        title: 'test task',
        description: 'test description',
      };
      const expectedTask = 'some task';
      taskRepository.createTask.mockResolvedValue(expectedTask);

      // act
      const createResult = await tasksService.createTask(
        createTaskDto,
        mockUser,
      );

      // assert
      expect(createResult).toEqual(expectedTask);
      expect(taskRepository.createTask).toHaveBeenCalledTimes(1);
      expect(taskRepository.createTask).toHaveBeenCalledWith(
        createTaskDto,
        mockUser,
      );
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      // arrange
      taskRepository.delete.mockResolvedValue({ affected: 1 });

      // act
      await tasksService.deleteTask(1, mockUser);

      // assert
      expect(taskRepository.delete).toHaveBeenCalledTimes(1);
      expect(taskRepository.delete).toHaveBeenCalledWith({
        id: 1,
        userId: mockUser.id,
      });
    });

    it('should throw an error when task is not found', () => {
      // arrange
      taskRepository.delete.mockResolvedValue({ affected: 0 });

      // act
      const deleteResult = tasksService.deleteTask(1, mockUser);

      // assert
      expect(deleteResult).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTaskStatus', () => {
    it('should update the task status', async () => {
      // arrange
      const save = jest.fn().mockResolvedValue(true);
      tasksService.getTaskById = jest.fn().mockResolvedValue({
        status: TaskStatus.OPEN,
        save,
      });

      // act
      const updateResult = await tasksService.updateTaskStatus(
        1,
        TaskStatus.DONE,
        mockUser,
      );

      // assert
      expect(tasksService.getTaskById).toHaveBeenCalledTimes(1);
      expect(save).toHaveBeenCalledTimes(1);
      expect(updateResult.status).toEqual(TaskStatus.DONE);
    });
  });
});
