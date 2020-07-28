import { Controller, Get, Param, Query, Post, Put, Body } from '@nestjs/common';
import { Answer } from '@libs/db/model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnswerDto } from './dto/answer.dto';
import { AnswersService } from './answers.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../decorator/pagination.decorator';
import { PaginationDto } from '../courses/dto/pagination.dto';
import { identity } from 'rxjs';

@ApiTags('')
@Crud({ model: Answer ,routes:{update:false,create:false}})
@Controller('answers')
export class AnswersController {
  constructor(
    @InjectModel(Answer) private readonly model: ReturnModelType<typeof Answer>,
    private readonly answerService: AnswersService,
  ) {}

  @Get('draft/:id')
  async getDraftList(@Param('id') id: string) {
    return await  this.answerService.getDraftAnswer(id);
  }
  @Get('pagination/:id')
  async getAnswerPagination(
    @Param('id') id: string,
    @Pagination() pagination: PaginationDto<Answer>,
  ) {
    return  await this.answerService.getAnswerByAuthorId(id, pagination);
  }

  @Put(':id')
  async updateAnswer(@Param('id') id:string,@Body('answers') body:AnswerDto){
    return await this.answerService.updateAnswer(body,id)
  }
  @Post()
  async create(@Body('answers') answer:AnswerDto){
    return await this.answerService.createAnswer(answer)
  }
}
