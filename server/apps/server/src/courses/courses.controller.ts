import { Controller, Get, Query } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';

import { InjectModel } from 'nestjs-typegoose';
import {  ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/model';
import { CourseRepository } from '@libs/db/repository';
import { Pagination } from 'apps/admin/src/decorator/pagination.decorator';
import { PaginationDto } from 'apps/admin/src/courses/dto/pagination.dto';



@Crud({
  model: Course,
  routes: { create: false, update: false, delete: false },
})
@Controller('courses')
@ApiTags('courses')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
    private readonly courseRepository:CourseRepository
  ) {}
  
  @Get('specific/:id')
  async get(@Query('id')id:string,@Query('uid') uid:string) {
    return this.courseRepository.getVideoForSpecificUser(id,uid)
  }

  @Get('/pagination')
  async getVideoPagination(@Pagination() pagination:PaginationDto<Course>){
    return this.courseRepository.getAllCoursePublished(pagination)
  }
}
