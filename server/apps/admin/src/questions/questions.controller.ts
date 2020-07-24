import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from 'nestjs-mongoose-crud';
import { Question } from '@libs/db/model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';

import { Pagination } from '../decorator/pagination.decorator';
import { QuestionsService } from './questions.service';
@Crud({ model: Question, })
@ApiTags('question')
@Controller('questions')
export class QuestionsController {
  constructor(
    @InjectModel(Question)
    private readonly model: ReturnModelType<typeof Question>,
    private readonly questionService: QuestionsService,
  ) {}

  @Get('byOne/:id')
  async getQuestionByOne(@Param('id') id:string){
    return await this.questionService.getSpQuestion(id)
  }
}
