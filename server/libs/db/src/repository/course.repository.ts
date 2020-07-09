import { Course, Question } from "../model";
import { ReturnModelType, DocumentType, buildSchema, getModelForClass, } from "@typegoose/typegoose";
import { BaseRepository, PaginationParams, Paginator } from "./base.repository";
import { InjectModel } from "nestjs-typegoose";
import { FindAndModifyWriteOpResultObject } from 'mongodb'
import { ModelPopulateOptions } from "mongoose";
import { Injectable } from "@nestjs/common";
export type CourseEntity = Course
export type CourseModel = ReturnModelType<typeof Course>
const popuList: ModelPopulateOptions[] = [{ model: 'Question', path: 'questions', options: { limit: 20 }, }, { path: 'author', select: '-password' }, { path: 'viewedCount' }, { path: 'likeCount' }]
@Injectable()
export class CourseRepository extends BaseRepository<Course>{
  constructor(@InjectModel(Course) private readonly _model: CourseModel) {
    super(_model)
   
  }

  async getCourseByAuthorId(authorId: string, pagenationParam?: PaginationParams<Course>) {
    // return super.paginator({ ...pagenationParam, query: { 'author_id': authorId ,} }, {},
    //   { populates: [{ path: 'viewedCount' }, 
    //   { path: 'likeCount' }, { path: 'questionCount' }, {path:'progress'}] }
    // )
    return await super.findAllAsync({author_id:authorId},'',{ populates: [{ path: 'viewedCount' }, 
      { path: 'likeCount' }, { path: 'questionCount' }, {path:'progress'}] })
  }



  /**
   * @description this is api for home page video
   * 
   * @param pagenationParam 
   */
  async getAllCoursePublished(pagenationParam: PaginationParams<Course>): Promise<Paginator<Course>> {
    return super.paginator({ ...pagenationParam, query: { 'progress.status': 'published' } }, '-file', { populates: [
      { path: 'viewedCount' }, 
      { path: 'likeCount' }, { path: 'questionCount' },{ path: 'author', match:'_id username avatar'}
    ] })
  }

  async getVideo(id: string): Promise<Course> {

    return super.findByIdAsync(id, {},
      {
        populates: [{ model: 'Question', path: 'questions', }, { path: 'viewedCount' },{path:'author',model:"User"},{path:'progress'},{path:'likeCount'}
        ]
      })
  }



  async createVideo(doc: Partial<Course>, ): Promise<DocumentType<Course>> {
    
    return super.create(doc)
  }

  async deleteVideo(id: string): Promise<FindAndModifyWriteOpResultObject<DocumentType<Course>>> {
    return super.deleteByIdAsync(id);
  }


  async updateVideo(doc: Partial<Course>, id: string) {
    return super.updateAsync(id, doc)
  }
}