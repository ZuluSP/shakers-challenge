import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Project } from '../../domain/models/project.model';
import type {
  IProjectRepository,
  ProjectFilters,
} from '../../domain/repositories/project.repository.interface';

@Injectable()
export class JsonProjectRepository implements IProjectRepository, OnModuleInit {
  private projects: Project[] = [];
  private staticData: any = {};

  onModuleInit() {
    this.loadData();
  }

  private loadData() {
    const dataPath = path.join(process.cwd(), 'data');
    
    const rawProjects = JSON.parse(
      fs.readFileSync(path.join(dataPath, 'projects.json'), 'utf-8'),
    );
    const rawStaticData = JSON.parse(
      fs.readFileSync(path.join(dataPath, 'static-data.json'), 'utf-8'),
    );

    this.staticData = rawStaticData;

    this.projects = rawProjects.map((raw: any) => this.mapToDomain(raw));
  }

  async findAll(filters?: ProjectFilters): Promise<Project[]> {
    let result = [...this.projects];

    if (!filters) return result;

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term),
      );
    }

    if (filters.category && filters.category.length > 0) {
      result = result.filter((p) => filters.category!.includes(p.category.id));
    }

    if (filters.industry && filters.industry.length > 0) {
      result = result.filter((p) => filters.industry!.includes(p.organization.industry.id));
    }

    if (filters.skills && filters.skills.length > 0) {
      result = result.filter((p) =>
        p.positions.some((pos) =>
          pos.skills.some((skill) => filters.skills!.includes(skill.id)),
        ),
      );
    }

    if (filters.specialties && filters.specialties.length > 0) {
      result = result.filter((p) =>
        p.positions.some((pos) =>
          pos.specialties.some((spec) => filters.specialties!.includes(spec.id)),
        ),
      );
    }

    if (filters.sortBy === 'newest') {
      result.sort((a, b) => {
        const dateA = a.publishedAt?.getTime() ?? 0;
        const dateB = b.publishedAt?.getTime() ?? 0;
        return dateB - dateA;
      });
    } else if (filters.sortBy === 'oldest') {
      result.sort((a, b) => {
        const dateA = a.publishedAt?.getTime() ?? 0;
        const dateB = b.publishedAt?.getTime() ?? 0;
        return dateA - dateB;
      });
    }

    return result;
  }

  async findById(id: number): Promise<Project | null> {
    return this.projects.find((p) => p.id === id) || null;
  }

  private mapToDomain(raw: any): Project {
    const getById = (list: any[], id: number) => 
      list.find((item) => item.id === id) || { id, name: 'Unknown' };

    return {
      ...raw,
      creationDate: new Date(raw.creationDate),
      startDate: new Date(raw.startDate),
      publishedAt: raw.publishedAt ? new Date(raw.publishedAt) : null,
      
      organization: {
        ...raw.organization,
        industry: getById(this.staticData.industries, raw.organization.industry),
      },
      
      category: getById(this.staticData.categories, raw.category),
      subcategory: getById(this.staticData.subcategories, raw.subcategory),
      
      positions: raw.positions.map((pos: any) => ({
        ...pos,
        skills: pos.skills.map((id: number) => getById(this.staticData.skills, id)),
        specialties: pos.specialties.map((id: number) => getById(this.staticData.specialties, id)),
      })),
    };
  }
}