import { Module } from '@nestjs/common';
import { ProjectController } from './infrastructure/controllers/project.controller';
import { ProjectService } from './application/use-cases/project.service';
import { JsonProjectRepository } from './infrastructure/persistence/json-project.repository';

@Module({
  imports: [],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: 'IProjectRepository',
      useClass: JsonProjectRepository,
    },
  ],
})
export class AppModule {}