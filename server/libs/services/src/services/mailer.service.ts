import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Workshop, Course, User } from "@libs/db/model";

@Injectable()
export class CurMailService{
    constructor(private readonly mailService:MailerService){}

    /**
     * @description: when audit start ,send email to author
     */
    async progressEmail(){
       await this.mailService.sendMail({

        })
    }
   
     /**
      * @description: when audit success or failed, send email to author
      * @param successed whether success or fail
      * @param resource  content 
      * @param target send to 
      */
    async finalStateEmail(successed:boolean,resource:Partial<Workshop|Course>,target:Partial<User>){

    }
    /**
     * @description: send email to auditer when the video is deleted 
     */
    async AuditCancel(){

    }
    /**
     * @description: send email to auditer when video is changed
     */
    async ReAudit(){

    }


}