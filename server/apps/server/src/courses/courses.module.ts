import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CourseRepository } from '@libs/db/repository';
import { CoursesController } from './courses.controller';


@Module({
  imports:[CourseRepository,],
  providers: [CoursesService,CourseRepository],
  controllers:[CoursesController]
})
export class CoursesModule {}
