
import { Process, Processor } from '@nestjs/bull';
import {Job} from 'bull'
import { CurMailService } from './mailer.service';
import { Course, User, Workshop } from '@libs/db/model';



type A={info:Partial<Workshop|Course>,sender:Partial<User>,type:string}
@Processor('mail')
export class MailProcessor{
    constructor(private readonly mailService:CurMailService){}

    @Process('change_video')
    async courseUpdateHandler(job:Job<A>){
        const {info,sender,type}:A=job.data
        if(type==='deleteOne'){
            this.mailService.AuditCancel()
        }else{
            this.mailService.ReAudit()
        }
    }

    @Process('change_audit')
    async AuditChangeHandler(){

    }

    
}