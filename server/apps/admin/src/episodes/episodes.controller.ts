import { Controller } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/model/episode.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
@Crud({model:Episode})
@Controller('episodes')
export class EpisodesController {
    constructor(@InjectModel(Episode) private readonly model:ReturnModelType<typeof Episode>){}
}
