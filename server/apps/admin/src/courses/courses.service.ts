import { Injectable } from '@nestjs/common';
import { CourseRepository, ProgressRepository } from '@libs/db/repository';
import { PaginationDto } from './dto/pagination.dto';
import { CourseDto } from './dto/course.dto';
import { Course, } from '@libs/db/model';
import {DocumentType} from '@typegoose/typegoose'

@Injectable()
export class CoursesService {
    constructor(private readonly courseRepository:CourseRepository,private readonly progressRepository:ProgressRepository){}


    async getMyCourse(id:string,pagination?:PaginationDto){
        return this.courseRepository.getCourseByAuthorId(id,{...pagination})
    }

    async createCourse(dto:CourseDto){

        const a= await this.courseRepository.createVideo({...dto})
        await this.progressRepository.createProgress({status:'stage1',obj_id:a._id,})
        return  a.populate({path:'progress'});
        
    }
    /**
     * @description get specific course by id
     * @param id 
     */
    async getCourseById(id:string){
        return this.courseRepository.getVideo(id)
    }

    async deleteCourseById(id:string){
        await this.progressRepository.deleteProgress(id)
        return this.courseRepository.deleteVideo(id)
    }

    async updateCourse(id:string,doc:CourseDto,progress_id:string){
        const a:DocumentType<Course>=await this.courseRepository.updateVideo(doc,id)
        await this.progressRepository.updateAsync(progress_id,{status:'stage1'})

        return a.populate({path:'progress'})
    }
}
