import { Course, Question, Action } from "../model";
import { ReturnModelType, DocumentType, buildSchema } from "@typegoose/typegoose";
import { BaseRepository, PaginationParams, Paginator } from "./base.repository";
import { InjectModel } from "nestjs-typegoose";
import {FindAndModifyWriteOpResultObject} from 'mongodb'
import { ModelPopulateOptions } from "mongoose";
export type CourseEntity=Course
export type CourseModel = ReturnModelType<typeof Course>
const popuList:ModelPopulateOptions[]=[{model:'Question',path:'questions',options:{}},{model:'User',path:'author',select:'-password'},{model:'Action',path:'viewCount'}]
export class CourseRepository extends BaseRepository<Course>{
    constructor(@InjectModel(Course) private readonly _model:CourseModel){
        super(_model)
     }

     async getCourseByAuthorId(authorId:string,pagenationParam:PaginationParams<Course>):Promise<Paginator<Course>>{
           return  super.paginator({...pagenationParam,query:{'author._id':authorId}},{},{populates:popuList}
           )
            
         
     }

    
    /**
     * @description this is api for home page video
     * 
     * @param pagenationParam 
     */
     async getAllCoursePublished(pagenationParam:PaginationParams<Course>):Promise<Paginator<Course>>{
            return super.paginator({...pagenationParam,query:{'progress.status':'published'}},{},{populates:popuList})
     }



     async createVideo(doc:Course,):Promise<DocumentType<Course>>{
        return super.create(doc)
     }

     async deleteVideo(id:string):Promise<FindAndModifyWriteOpResultObject<DocumentType<Course>>>{
       return super.deleteByIdAsync(id);
     }


     async updateVideo(doc:Partial<Course>,id:string){
         return super.updateAsync(id,doc)
     }
}