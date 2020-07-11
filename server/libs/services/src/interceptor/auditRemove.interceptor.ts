import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import {  CourseRepository, AuditRepository } from "@libs/db/repository";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { tap,map } from 'rxjs/operators';
import {Request} from 'express'
import { Audit } from "@libs/db/model";
export interface Response<Audit>{
    data:Audit
}
@Injectable()
export class AuditRemoveInterceptor implements NestInterceptor{

    constructor(@InjectQueue('mail') private mailQueue:Queue,
    private readonly auditRepository:AuditRepository,private readonly courseRepository:CourseRepository){}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {

        const request:Request=context.switchToHttp().getRequest()
        const method=context.getHandler().name
        const id=request.params.id
        const result=await this.auditRepository.findByIdAsync(id)
        return next.handle().pipe(map(async(data)=>{
            let resource=null
            if(data.type=='Course'){
               resource=this.courseRepository.findOneAsync({_id:data.object_id},'',{populates:[{path:'author'},{path:'progress'}]})
                
            }else if(data.type==='Workshop'){}
                
            await this.mailQueue.add('change_audit',{sender:data.auditer,info:resource,})
                
            
        }))
    }
  

}