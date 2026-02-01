import { Test, TestingModule } from '@nestjs/testing';
import { ProjectController } from './project.controller';
import { ProjectService } from '../../application/use-cases/project.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ProjectController', () => {
  let controller: ProjectController;
  let service: ProjectService;

  const mockProject = { id: 1, title: 'Test Project' };
  const mockFilterOptions = { skills: [], specialties: [], industries: [], categories: [] };

  const mockProjectService = {
    getProjects: jest.fn(),
    getProjectById: jest.fn(),
    getFilterOptions: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectService,
          useValue: mockProjectService,
        },
      ],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call service.getProjects with parsed filters', async () => {
      const filtersQuery = {
        search: 'react',
        category: '1,2',
        sortBy: 'newest' as const,
      };

      mockProjectService.getProjects.mockResolvedValue([mockProject]);

      const result = await controller.findAll(
        filtersQuery.search,
        filtersQuery.category,
        undefined, undefined, undefined,
        filtersQuery.sortBy
      );

      expect(service.getProjects).toHaveBeenCalledWith({
        searchTerm: 'react',
        category: [1, 2],
        industry: undefined,
        skills: undefined,
        specialties: undefined,
        sortBy: 'newest',
      });
      expect(result).toEqual([mockProject]);
    });
  });

  describe('getFilterOptions', () => {
    it('should return static data options', async () => {
      mockProjectService.getFilterOptions.mockResolvedValue(mockFilterOptions);
      
      const result = await controller.getFilterOptions();
      
      expect(service.getFilterOptions).toHaveBeenCalled();
      expect(result).toEqual(mockFilterOptions);
    });
  });

  describe('findOne', () => {
    it('should return a project if it exists', async () => {
      mockProjectService.getProjectById.mockResolvedValue(mockProject);
      
      const result = await controller.findOne(1);
      
      expect(service.getProjectById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProject);
    });

    it('should throw 404 HttpException if service throws an error', async () => {
      mockProjectService.getProjectById.mockRejectedValue(new Error('Project not found'));

      await expect(controller.findOne(999)).rejects.toThrow(HttpException);
      await expect(controller.findOne(999)).rejects.toThrow(
        expect.objectContaining({
          status: HttpStatus.NOT_FOUND,
          message: 'Project not found',
        }),
      );
    });
  });
});