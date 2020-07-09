import { Injectable } from '@nestjs/common';
import { QuestionRepository } from '@libs/db/repository';
import { PaginationDto } from '../courses/dto/pagination.dto';

@Injectable()
export class QuestionsService {
    constructor(private readonly questionRepository:QuestionRepository){}

    async getQuestionPaginationByUser(id:string,pagination:PaginationDto){

    }
    async getQuestionListByUser(id:string){
        return await this.questionRepository.findAllAsync({author_id:id},'-answer',{populates:[{path:'question',populate:[{path:'course',select:'title cover _id'}]}]})
    }
    async getQuestionListByVideo(id:string){
        return await this.questionRepository.findAllAsync({course_id:id},'',{populates:[{path:'author'}]})
    }

    async deleteQuestion(id:string){
        return await this.questionRepository.deleteQuestionById(id)
    }
    async cascadeDeleteVideo(id:string){
        return await this.questionRepository.deleteQuestionByVideoId(id)
    }
}
