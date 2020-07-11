import { Injectable } from '@nestjs/common';
import { CourseRepository } from '@libs/db/repository';
import { PaginationDto } from './dto/pagination.dto';
import { CourseDto } from './dto/course.dto';
import { Course, Audit } from '@libs/db/model';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { AuditRepository } from '@libs/db/repository/audit.repository';
import { getClassForDocument,DocumentType } from '@typegoose/typegoose';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CourseRepository,
    @InjectQueue('mail') private mailQueue:Queue,
    private readonly auditRepository:AuditRepository
    ) {}

  async getMyCourse(id: string, pagination?: PaginationDto<Course>) {
    return this.courseRepository.getCourseByAuthorId(id, { ...pagination });
  }

  async createCourse(dto: CourseDto) {

    return await this.courseRepository.createVideo({ ...dto });

  }
  /**
   * @description get specific course by id
   * @param id
   */
  async getCourseById(id: string) {
    return this.courseRepository.getVideo(id);
  }
  
  async deleteCourseById(id: string) {
    return this.courseRepository.deleteVideo(id);
  }

  async updateCourse(id: string, doc: CourseDto) {
    const audit:DocumentType<Audit>=await this.auditRepository.findOne({obj_id:id},'',{populates:[{path:'auditer',model:'User'},{path:'object'}]})
   
    if(audit.auditer){
      await this.mailQueue.add('update_video',{sender:audit.auditer,info:audit.object})
    }
    
   return await this.courseRepository.updateVideo(
      doc,
      id,
    )

   
  }

  async getAnswerListByUser(id: string, pagination: PaginationDto<Course>) {
    await this.courseRepository.getQuestionListFromUser(id, pagination);
  }
}
