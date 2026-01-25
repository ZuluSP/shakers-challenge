import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { Project } from '../../domain/models/project.model';

const mockProjectRepository = {
  findAll: jest.fn(),
  findById: jest.fn(),
};

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: 'IProjectRepository',
          useValue: mockProjectRepository,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getProjects', () => {
    it('should return an array of projects', async () => {
      const result: Project[] = [{ id: 1, title: 'Test Project' } as any];
      mockProjectRepository.findAll.mockResolvedValue(result);

      const projects = await service.getProjects();
      
      expect(projects).toBe(result);
      expect(mockProjectRepository.findAll).toHaveBeenCalled();
    });

    it('should pass filters to the repository', async () => {
      const filters = { searchTerm: 'react' };
      await service.getProjects(filters);
      expect(mockProjectRepository.findAll).toHaveBeenCalledWith(filters);
    });
  });

  describe('getProjectById', () => {
    it('should return a single project', async () => {
      const result = { id: 1, title: 'Test Project' };
      mockProjectRepository.findById.mockResolvedValue(result);

      const project = await service.getProjectById(1);
      expect(project).toBe(result);
    });

    it('should throw an error if project is not found', async () => {
      mockProjectRepository.findById.mockResolvedValue(null);

      await expect(service.getProjectById(999)).rejects.toThrow();
    });
  });
});