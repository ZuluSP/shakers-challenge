import {
  Controller,
  Get,
  Param,
  Query,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from '../../application/use-cases/project.service';
import { ProjectFilters } from '../../domain/repositories/project.repository.interface';
import { StaticData } from 'src/domain/models/static-data.model';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('industry') industry?: string,
    @Query('skills') skills?: string,
    @Query('specialties') specialties?: string,
    @Query('sortBy') sortBy?: 'newest' | 'oldest',
  ) {
    const parseIds = (val?: string) =>
      val ? val.split(',').map((id) => Number(id)).filter(n => !isNaN(n)) : undefined;

    const filters: ProjectFilters = {
      searchTerm: search,
      category: parseIds(category),
      industry: parseIds(industry),
      skills: parseIds(skills),
      specialties: parseIds(specialties),
      sortBy: sortBy,
    };

    return this.projectService.getProjects(filters);
  }

  @Get('metadata/filters')
  async getFilterOptions(): Promise<StaticData> {
    return this.projectService.getFilterOptions();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.projectService.getProjectById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}