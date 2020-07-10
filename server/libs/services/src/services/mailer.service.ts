import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class CurMailService{
    constructor(private readonly mailService:MailerService){}

    /**
     * @description: when audit start ,send email to author
     */
    async progressEmail(){

    }
    /**
     * 
     */
    async finalStateEmail(){

    }


}