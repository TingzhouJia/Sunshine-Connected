import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/model/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/model/course.model';
@Crud({model:Episode})
@Controller('episodes')
export class EpisodesController {
    constructor(@InjectModel(Episode) private readonly model:ReturnModelType<typeof Episode>,
    @InjectModel(Course) private readonly courseModel:ReturnModelType<typeof Course>
    ){}
    @Get('option')
    async option(){
        const course=(await this.courseModel.find()).map(v=>({label:v.title,value:v._id}))
        return {
            title:"课时管路",
            translate:false,
            column:[
                {prop:'name',label:"名称"},
                {prop:'course',label:"所属课程",type:"select",row:true,dicData:course},
                {prop:"file",label:"视频文件",span:24,type:'upload',listType:'picture-img'}
            ]
        }
    }
}
