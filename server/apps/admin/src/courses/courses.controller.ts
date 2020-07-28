import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,

  Delete,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/model/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CourseDto } from './dto/course.dto';
import { CoursesService } from './courses.service';
import { PaginationDto } from './dto/pagination.dto';
import { Pagination } from '../decorator/pagination.decorator';
import { CourseChangeInterceptor } from './courseChange.interceptor';
import { PaginationParams } from '@libs/db/repository';

@Crud({ model: Course, routes: { update: false ,delete:false} })
@Controller('courses')
@ApiTags('course')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
    private readonly courseService: CoursesService,
  ) {}

  @ApiOperation({ description: 'fetch one video' })
  @Get('fetch_one/:id')
  async fetch(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  @ApiOperation({ description: 'fetch all video of one user' })
  @Get('fetch_all/:id')
  async fetchAll(
    @Param('id') id: string,
    @Pagination() pagination: PaginationDto<Course>,
  ) {
    return await this.courseService.getMyCourse(id, pagination);
  }
  @Get('fetch_by_type/:id/:answered')
  async fetchByType(@Param('id') id:string,@Param('answered') answered:string)
{
  return await this.courseService.getTypedListByUser(id,answered==='1')
}

  @ApiOperation({ description: 'fetch all question list for one publisher' })
  @Get('all_question/:id')
  async fetchQuestionList(
    @Param('id') id: string,
    
  ) {
   
    return await this.courseService.getAnswerListByUser(id);
  }
  @ApiOperation({ description: 'create a video' })
  @ApiBody({ type: CourseDto, description: 'body for course' })
  @Post('create')
  async create(@Body('course') course: CourseDto) {

    return await this.courseService.createCourse(course);
  }


  @ApiOperation({ description: 'update a video' })
  @ApiBody({ type: CourseDto, description: 'body for course' })
  @UseInterceptors(CourseChangeInterceptor)
  @Put(':id')
  async updateOne(@Body('course') course: CourseDto,@Param('id') id:string) {
    return await this.courseService.updateCourse(id, course);
  }

  @ApiOperation({description:'delete a video'})
  @UseInterceptors(CourseChangeInterceptor)
  @Delete(':id')
  async deleteOne(@Param('id') id: string){
    return await this.courseService.deleteCourseById(id)
  }

  @ApiOperation({description:'course need audit'})
  @Get('/need_audit')
  async getCourseNeedAudit(@Pagination() pagniation:PaginationDto<Course>,@Query('id') id:string){
      return await this.courseService.getCourseNeedAudit(id,pagniation)
  }
}
