import { Course } from "../model";
import { ReturnModelType, DocumentType, buildSchema } from "@typegoose/typegoose";
import { BaseRepository, PaginationParams, Paginator } from "./base.repository";
import { InjectModel } from "nestjs-typegoose";
import {FindAndModifyWriteOpResultObject} from 'mongodb'
export type CourseEntity=Course
export type CourseModel = ReturnModelType<typeof Course>
const c=buildSchema(Course)
export class CourseRepository extends BaseRepository<Course>{
    constructor(@InjectModel(Course) private readonly _model:CourseModel){
        super(_model)
     }

     async getCourseByAuthorId(authorId:string,pagenationParam:PaginationParams<Course>):Promise<Paginator<Course>>{
           return  super.paginator({...pagenationParam,query:{'author._id':authorId}},)
            
     }

     async createVideo(doc:Course,):Promise<DocumentType<Course>>{
        return super.create(doc)
     }

     async deleteVideo(id:string):Promise<FindAndModifyWriteOpResultObject<DocumentType<Course>>>{
       return super.deleteByIdAsync(id);
     }


     async updateVideo(doc:Course,id:string){
         return super.updateAsync(id,doc)
     }
}