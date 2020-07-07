import { Controller, Get } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/model/course.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
@Crud({model:Course})
@Controller('courses')
@ApiTags('course')
export class CoursesController {
    constructor(@InjectModel(Course) private readonly model:ReturnModelType<typeof Course>){}
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
}
