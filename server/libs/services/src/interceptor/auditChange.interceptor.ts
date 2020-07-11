import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import {  CourseRepository } from "@libs/db/repository";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { tap,map } from 'rxjs/operators';
import {Request} from 'express'
import { Audit } from "@libs/db/model";
export interface Response<Audit>{
    data:Audit
}
@Injectable()
export class AuditInterceptor<T> implements NestInterceptor<Audit,Response<Audit>>{

    constructor(@InjectQueue('mail') private mailQueue:Queue,
    private readonly courseRepository:CourseRepository){}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

       
        return next.handle().pipe(map(async(data)=>{
            let resource=null
            if(data.type=='Course'){
               resource=this.courseRepository.findOneAsync({_id:data.object_id},'',{populates:[{path:'author'},{path:'progress'}]})
                
            }else if(data.type==='Workshop'){}
                
            await this.mailQueue.add('change_audit',{sender:data.auditer,info:resource,})
                
            
        }))
    }
  

}