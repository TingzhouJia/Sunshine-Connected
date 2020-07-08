import { Controller, Get, Post, Query, Body, Param, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/model/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { CourseDto } from './dto/course.dto';
import { CoursesService } from './courses.service';
import { PaginationDto } from './dto/pagination.dto';
// @Crud({model:Course})
@Controller('courses')
@ApiTags('course')
export class CoursesController {
    constructor(@InjectModel(Course) private readonly model: ReturnModelType<typeof Course>,
        private readonly courseService: CoursesService
    ) { }

    @ApiOperation({ description: 'fetch one video' })
    @Get('fetch_one/:id')
    async fetch(@Param('id') id: string) {
        return this.courseService.getCourseById(id)
    }

    @ApiOperation({ description: 'fetch all video of one user' })
    @ApiBody({ type: PaginationDto, description: 'pagination info, Optional' })
    @Get('fetch_all/:id')
    async fetchAll(@Param('id') id: string, @Body('pagination') pagination: PaginationDto) {
        return await this.courseService.getMyCourse(id, pagination)
    }

    @ApiOperation({description:'create a video'})
    @ApiBody({type:CourseDto,description:'body for course'})
    @Post('create')
    async create(@Body('course') course:CourseDto){
        return await this.courseService.createCourse(course)
    }

    @ApiOperation({description:'update a video'})
    @ApiBody({type:CourseDto,description:'body for course'})
    @Put()
    async updateOne(@Body('course') course:CourseDto){
        if(!course.progress_id&&!course.course_id){
            throw new HttpException('no course progress_id or ',HttpStatus.FORBIDDEN)
        }
        return await this.courseService.updateCourse(course.course_id,course,course.progress_id)
    }
}
