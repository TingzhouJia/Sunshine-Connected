import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseRepository, ProgressRepository } from '@libs/db/repository';

@Module({
  imports:[CourseRepository,ProgressRepository],
  controllers: [CoursesController],
  providers: [CoursesService,CourseRepository,ProgressRepository]
})
export class CoursesModule {}
