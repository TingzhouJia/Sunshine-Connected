import { Controller } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Question } from '@libs/db/model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { QuestionRepository } from '@libs/db/repository';
@Crud({ model: Question })
@ApiTags('question')
@Controller('questions')
export class QuestionsController {
  constructor(
    @InjectModel(Question)
    private readonly model: ReturnModelType<typeof Question>,
    private readonly questionRepository: QuestionRepository,
  ) {}
}
