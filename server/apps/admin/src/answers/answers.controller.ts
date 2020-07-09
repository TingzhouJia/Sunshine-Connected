import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import { Answer } from '@libs/db/model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnswerDto } from './dto/answer.dto';
import { AnswersService } from './answers.service';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from '../decorator/pagination.decorator';
import { PaginationDto } from '../courses/dto/pagination.dto';


@ApiTags('')
@Crud({model:Answer})
@Controller('answers')
export class AnswersController {
    constructor(@InjectModel(Answer) private readonly model:ReturnModelType<typeof Answer>,
    private readonly answerService:AnswersService
    ){}

    @Get('draft/:id')
    async getDraftList(@Param('id') id:string){
        return this.answerService.getDraftAnswer(id)
    }
    @Get('pagination/:id')
    async getAnswerPagination(
   @Param('id') id:string,
    @Pagination() pagination:PaginationDto<Answer>){
       
        return this.answerService.getAnswerByAuthorId(id,pagination)
    }

 
}
