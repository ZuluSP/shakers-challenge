import { Project } from '../models/project.model';

export interface ProjectFilters {
  searchTerm?: string;
  specialties?: number[];
  skills?: number[];
  industry?: number[];
  category?: number[];
  sortBy?: 'newest' | 'oldest';
}

export interface IProjectRepository {

  findAll(filters?: ProjectFilters): Promise<Project[]>;

  findById(id: number): Promise<Project | null>;
}