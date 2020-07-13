import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, async } from "rxjs";
import {   AuditRepository } from "@libs/db/repository";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";
import { tap,map } from 'rxjs/operators';
import {Request } from 'express'
import { Audit } from "@libs/db/model";
import { MailQueueService } from "@app/mail-queue";
export interface Response<Audit>{
    data:Audit
}
@Injectable()
export class AuditInterceptor<T> implements NestInterceptor<Audit,Response<Audit>>{

    constructor(private readonly mailQueueService:MailQueueService,
    private readonly auditRepository:AuditRepository){}
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
            const request:Request=context.switchToHttp().getRequest()
            const method=context.getHandler().name
            const id=request.params.id
            let res;
             if(method=="deleteAudit"){
                res=await this.auditRepository.findByIdAsync(id)
             }

       
        return next.handle().pipe(tap(async()=>{
            if(method==='deleteAudit'){
                return await this.mailQueueService.addChangeAudit(res.obj_id)// this.mailQueue.add('end_audit',{id:res.obj_id})
            }
            return await this.mailQueueService.addStartAudit(id)
        }))
    }
  

}