
import { Process, Processor } from '@nestjs/bull';
import {Job} from 'bull'
import { CurMailService } from '../../services/src/services/mailer.service';
import { Course, User, Workshop, Audit, ProgressType } from '@libs/db/model';
import { AuditRepository, CourseRepository } from '@libs/db/repository';
import { isRefType, isDocument } from '@typegoose/typegoose';



type A={info:Partial<Course>,sender:Partial<User>,}
type B={id:string}
type C={id:string,failed:boolean}

@Processor('mail')
export class MailProcessor{
    constructor(private readonly mailService:CurMailService,
        private readonly auditrRepository:AuditRepository,
        private readonly courseRepository:CourseRepository){}

    @Process('delete_video')
    async courseDeleteHandler(job:Job<A>){
        const {info,sender}:A=job.data

        return this.mailService.AuditCancel(info,sender)

    }

    @Process('change_video')
    async courseChangeHandler(job:Job<B>){
        const {id}:B=job.data
        const result=await this.courseRepository.findByIdAsync(id)
        const auditer=await this.auditrRepository.findOneAsync({obj_id:id},'',{populates:[{path:'auditer'}]})
        if(isDocument(auditer.auditer)){
            return this.mailService.ReAudit(result,auditer.auditer)
        }
    }

    @Process('start_audit')
    async AuditChangeHandler(job:Job<B>){
        const {id}:B=job.data
        const result:Audit=await this.auditrRepository.findByIdAsync(id,'',{populates:[{path:'progress'},{path:'object'}]})
        if(isDocument(result.progress)&&isDocument(result.object)&&isDocument(result.object.author)){
            if(result.progress.status===ProgressType.STAGE2){
                return this.mailService.progressEmail(result.object,result.object.author)
            }else{
                return this.mailService.finalStateEmail(false,result.object,result.object.author)
            }
        }
    }

    @Process('end_audit')
    async AuditFinishhandler(job:Job<B>){
        const {id}:B=job.data
        const course=await this.courseRepository.findByIdAsync(id,'',{populates:{path:'author'}})
        if(isDocument(course.author)){
            return this.mailService.finalStateEmail(true,course,course.author)
        }
      
    }

    
}