import { Inject, Injectable } from '@nestjs/common';
import { Project } from '../../domain/models/project.model';
import type {
  IProjectRepository,
  ProjectFilters,
} from '../../domain/repositories/project.repository.interface';
import { StaticData } from 'src/domain/models/static-data.model';

@Injectable()
export class ProjectService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,
  ) {}

  async getProjects(filters?: ProjectFilters): Promise<Project[]> {
    return this.projectRepository.findAll(filters);
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
        throw new Error(`Project with ID ${id} not found`);
    }
    return project;
  }

  async getFilterOptions(): Promise<StaticData> {
    return this.projectRepository.getStaticData();
  }
  
}