import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Answer } from "../model";
import { InjectModel } from "nestjs-typegoose";
import { ReturnModelType } from "@typegoose/typegoose";

@Injectable()
export class AnswerRepository extends BaseRepository<Answer>{
    constructor(@InjectModel(Answer) private readonly _model:ReturnModelType<typeof Answer>){
        super(_model)
    }

    async createAnswer(doc:Partial<Answer>){
          return await super.create(doc)
    }


    async getAnswerListByQuestion(id:string){
       return await super.findAllAsync({question_id:id},'',{populates:[{path:'author'}]})
    }

    async getAnswerListByUserId(id:string){
        return await super.findAllAsync({author_id:id,isDraft:false},'',{populates:{path:'question'}})
    }

    async getDraftAnswerListByUserId(id:string){
        return await super.findAllAsync({author_id:id,isDraft:true})
    }

    async deleteAnswer(id:string){
        return await super.deleteByIdAsync(id)
    }

    async deleteByQuestionId(id:string){
        return await super.deleteAsync({question_id:id})
    }
    /**
     * @description answer question from draft box
     * @param id answer id
     * @param doc  content
     */
    async updateAnswer(id:string,doc:Partial<Answer>){
        return await super.updateAsync(id,doc)
    }

}