import { Injectable } from '@nestjs/common';
import { CourseRepository } from '@libs/db/repository';

@Injectable()
export class CoursesService {
    constructor(private readonly courseRepo:CourseRepository){}
    async getHomePageVideo(category:string[]){
        
    }

    async getOneVideo(id:string){
        const query={}

    }
}
