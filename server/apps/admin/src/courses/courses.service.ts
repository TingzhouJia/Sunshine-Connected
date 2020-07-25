import { Injectable } from '@nestjs/common';
import { CourseRepository } from '@libs/db/repository';
import { PaginationDto } from './dto/pagination.dto';
import { CourseDto } from './dto/course.dto';
import { Course } from '@libs/db/model';



@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CourseRepository,
   
    ) {}

  async getMyCourse(id: string, pagination?: PaginationDto<Course>) {
    return this.courseRepository.getCourseByAuthorId(id, { ...pagination });
  }

  async createCourse(dto: CourseDto) {

    return await this.courseRepository.createVideo(dto);

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
   
    
   return await this.courseRepository.updateVideo(
      doc,
      id,
    )

   
  }

  async getCourseNeedAudit(id:string,pagination:PaginationDto<Course>){
    return await this.courseRepository.getAllCourseNeedAudit(pagination,id)
  }

  async getAnswerListByUser(id: string, pagination: PaginationDto<Course>) {
   return await this.courseRepository.getQuestionListFromUser(id, pagination);
  }

  async getTypedListByUser(id:string,pagination:PaginationDto<Course>,answered:boolean){
    return await this.courseRepository.getTypedQuestionListFromUser(id,answered,pagination)
  }
}
