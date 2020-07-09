import { Injectable } from '@nestjs/common';
import { AnswerRepository, OrderType, PaginationParams } from '@libs/db/repository';
import { AnswerDto } from './dto/answer.dto';
import { Answer } from '@libs/db/model';

@Injectable()
export class AnswersService {
    constructor(private readonly answerRepository:AnswerRepository){
    }

    async getAnswerByAuthorId(id:string,pagination:PaginationParams<Answer>){
        return this.answerRepository.getAnswerListByUserId(id,pagination);
    }

    async getDraftAnswer(id:string){
        return this.answerRepository.getDraftAnswerListByUserId(id)
    }

    async removeAnswer(id:string){
        return await this.answerRepository.deleteAnswer(id)
    }
    /**
     * 
     * @param doc both draft and answer use this 
     */
    async createAnswer(doc:AnswerDto){
        return await this.answerRepository.createAnswer(doc)
    }
}
