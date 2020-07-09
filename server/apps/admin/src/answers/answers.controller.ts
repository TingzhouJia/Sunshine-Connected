import { Controller } from '@nestjs/common';
import { Answer } from '@libs/db/model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
@Crud({model:Answer})
@Controller('answers')
export class AnswersController {
    constructor(@InjectModel(Answer) private readonly model:ReturnModelType<typeof Answer>,
  
    ){}
}
