import { Course, ProgressType, Question } from '../model';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { BaseRepository, PaginationParams, Paginator } from './base.repository';
import { InjectModel } from 'nestjs-typegoose';
import { FindAndModifyWriteOpResultObject } from 'mongodb';
import { ModelPopulateOptions } from 'mongoose';
import { Injectable } from '@nestjs/common';
export type CourseEntity = Course;
export type CourseModel = ReturnModelType<typeof Course>;
const popuList: ModelPopulateOptions[] = [
  { model: 'Question', path: 'questions', options: { limit: 20 } },
  { path: 'author', select: '-password' },
  { path: 'viewedCount' },
  { path: 'likeCount' },
];
@Injectable()
export class CourseRepository extends BaseRepository<Course> {
  constructor(@InjectModel(Course) private readonly _model: CourseModel) {
    super(_model);
  }
  /**
   *
   * @param authorId
   * @param pagenationParam  use for frontend sort limit
   */
  async getCourseByAuthorId(
    authorId: string,
    pagenationParam?: PaginationParams<Course>,
  ) {
  
    return super.paginator(
      { ...pagenationParam, query: { author_id: authorId } },
      'title createdAt category stage',
      {
        populates: [
          { path: 'viewedCount' },
          { path: 'likeCount' },
          { path: 'questionCount' },
        ],
      },
    );
    //   return await super.findAllAsync({author_id:authorId},'',{ populates: [{ path: 'viewedCount' },
    //     { path: 'likeCount' }, { path: 'questionCount' }, {path:'progress'}] })
  }
  /**
   * @description get all question from all video of a user
   * @param uid
   * @param pagenationParam
   */
  async getQuestionListFromUser(
    uid: string,
    pagenationParam: PaginationParams<Course>,
  ) {
    return super.paginator(
      //stage: ProgressType.SUCCESSED should add stage 
      { ...pagenationParam, query: { author_id: uid } },
      'title updatedAt questions author_id',
      { populates: [{ path: 'questions', select:'isAnswered content timing updatedAt author_id author', populate: [{ path: 'author',select:'username avatar' }], },{path:'viewedCount'},{path:'likeCount'}] },
    );
  }

  async getTypedQuestionListFromUser(uid: string,answered:boolean,
    pagenationParam: PaginationParams<Course>,){
      return super.paginator(
        {...pagenationParam,query:{author_id:uid}},'title updatedAt questions',{
          populates: [{ path: 'questions',match:{'isAnswered':answered},select:'isAnswered content timing updatedAt author_id author', populate: [{ path: 'author',select:'username avatar' }], }] 
        }
      )
  }


  /**
   * @description this is api for home page video
   *
   * @param pagenationParam
   */
  async getAllCoursePublished(
    pagenationParam: PaginationParams<Course>,
  ): Promise<Paginator<Course>> {
    return super.paginator(
      { ...pagenationParam, query: { stage: ProgressType.SUCCESSED } },
      '-file',
      {
        populates: [
          { path: 'viewedCount' },
          { path: 'likeCount' },
          { path: 'questionCount' },
          { path: 'author', select: 'username avatar' },
        ],
      },
    );
  }

  async getVideo(id: string): Promise<Course> {
    return await super.findByIdAsync(
      id,
      {},
      {
        populates: [
          { path: 'questionsCount' },
          { path: 'viewedCount' },
          {path:'questions',populate:[{path:'author'}]},
          { path: 'progress' },
          { path: 'likeCount' },
        ],
      },
    );
  }

  async getVideoForSpecificUser(id:string,uid:string):Promise<Course>{
    return await super.findByIdAsync(id,'',{
      populates:[
        { model: 'Question', path: 'questions_count' },
        { path: 'viewedCount' },
        { path: 'author', model: 'User' },
        { path: 'progress' },
        { path: 'likeCount' },
        {path:'reactions',match:{'author_id':uid},}
      ]
    })
  }

  async getAllCourseNeedAudit(pagination: PaginationParams<Course>,id:string) {
    return await super.paginator(
      { ...pagination, query: { stage: ProgressType.STAGE1,author_id:{$ne:id}} },
      '',
      { populates: [{ path: 'author', select: '_id username avatar' }] },
    );
  }

  async createVideo(doc: Partial<Course>): Promise<DocumentType<Course>> {

    return await super.create(doc);
  }

  async deleteVideo(
    id: string,
  ): Promise<FindAndModifyWriteOpResultObject<DocumentType<Course>>> {
    return await super.deleteByIdAsync(id);
  }

  async updateVideo(doc: Partial<Course>, id: string) {
    return await super.updateAsync(id, doc);
  }
}
