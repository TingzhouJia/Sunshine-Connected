import { Injectable } from '@nestjs/common';
import { CourseRepository, ProgressRepository } from '@libs/db/repository';
import { PaginationDto } from './dto/pagination.dto';
import { CourseDto } from './dto/course.dto';
import { Course } from '@libs/db/model';
import { DocumentType } from '@typegoose/typegoose';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepository: CourseRepository) {}

  async getMyCourse(id: string, pagination?: PaginationDto<Course>) {
    return this.courseRepository.getCourseByAuthorId(id, { ...pagination });
  }

  async createCourse(dto: CourseDto) {
    const a = await this.courseRepository.createVideo({ ...dto });

    return this.courseRepository.getVideo(a._id);
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
    const a: DocumentType<Course> = await this.courseRepository.updateVideo(
      doc,
      id,
    );

    return this.courseRepository.getVideo(id);
  }

  async getAnswerListByUser(id: string, pagination: PaginationDto<Course>) {
    await this.courseRepository.getQuestionListFromUser(id, pagination);
  }
}
