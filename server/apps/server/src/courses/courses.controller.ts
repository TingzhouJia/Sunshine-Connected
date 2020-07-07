import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';

import { InjectModel } from 'nestjs-typegoose';
import {DocumentType, ReturnModelType} from '@typegoose/typegoose'
import { ApiTags } from '@nestjs/swagger';
import { Course } from '@libs/db/model';
import { from } from 'rxjs';

@Crud({model:Course,routes:{create:false,update:false,delete:false}})
@Controller('courses')
@ApiTags('courses')
export class CoursesController {
    constructor(@InjectModel(Course) private readonly model:ReturnModelType<typeof Course>){}

    get(){
       
    }
}
