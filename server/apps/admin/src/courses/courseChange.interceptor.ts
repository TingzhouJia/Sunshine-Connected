import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { AuditRepository } from "@libs/db/repository";
import { Observable } from "rxjs";
import {Request} from 'express'
import { Audit, User } from "@libs/db/model";

import { tap, map } from "rxjs/operators";
import { MailQueueService } from "@app/mail-queue";
import { isDocument } from "@typegoose/typegoose";
/**
 * @description: this is interceptor when update or delete a 
 */
@Injectable()
export class CourseChangeInterceptor implements NestInterceptor{
   

    constructor(
        private readonly mailQueueService:MailQueueService,
    private readonly auditRepository:AuditRepository){}

    async intercept(context: ExecutionContext, next: CallHandler<any>):Promise<Observable<any>> {

        const request:Request=context.switchToHttp().getRequest()
        const method=context.getHandler().name
        const id=request.params.id
        let audit:Audit=await this.auditRepository.findOneAsync({obj_id:id},'',{populates:[{path:'auditer',model:'User'},{path:'object'}]});
      

        return next.handle().pipe(tap(async()=>{
            if(audit.auditer!==null){
               if(method==='deleteOne'&&isDocument(audit.auditer)&&isDocument(audit.object)){
                return await this.mailQueueService.addDeleteVideo(audit.auditer,audit.object)
               }else{
                return await this.mailQueueService.addChangeVideo(id)
               }
            }
           
        }))
        
    }
    
}