import { Injectable } from "@nestjs/common";
import { BaseRepository, PaginationParams } from "./base.repository";
import { Question, Answer } from "../model";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType,} from "@typegoose/typegoose";


@Injectable()
export class QuestionRepository extends BaseRepository<Question>{
    
    constructor(@InjectModel(Question) private readonly _model:ReturnModelType<typeof Question>){
        super(_model)
       
    }

    async createQuestion(doc:Partial<Question>){
       
        return await super.create(doc)
    }
    async deleteQuestionById(id:string){
        return await super.deleteById(id)
    }
    async deleteQuestionByVideoId(id:string){
        
        return await super.deleteAsync({question_id:id})
    }

    //with pagination
    async getQuestionListByUserId(id:string,pagination:PaginationParams<Question>){
        return await super.paginator({...pagination,query:{author_id:id}},'-answer',{populates:[{path:'question',populate:[{path:'course',select:'title cover _id'}]}]})
    }
    //without pagination
    async getQuestionListByVideoId(id:string,pagination:PaginationParams<Question>){
        return await super.paginator({...pagination,query:{course_id:id}},'',{populates:[{path:'author'}]})
    }

}