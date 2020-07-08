import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/model/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CourseDto } from './dto/course.dto';
import { CoursesService } from './courses.service';
@Crud({model:Course})
@Controller('courses')
@ApiTags('course')
export class CoursesController {
    constructor(@InjectModel(Course) private readonly model:ReturnModelType<typeof Course>,
        private readonly courseService:CoursesService
    ){}
    @Get('option')
    option(){
        
        return {
            title:"课程管路",
            column:[
                {prop:'name',label:"名称",sortable:true,search:true,regex:true,row:true},
                {prop:'cover',label:"封面",type:'upload',listType:'picture-img',width:120,row:true,action:'/upload'},
            ]
        }
    }
    // @ApiOperation({description:'create course'})
    
    // @Post('create')
    // async create(@Body() course:CourseDto){
    //     return this.courseService.createCourse(course)
    // }


    @ApiOperation({description:'fetch one video'})
    @Get('fetch/:id')
    async fetch(@Param('id') id:string){
        return this.courseService.getCourseById(id)
    }
}
