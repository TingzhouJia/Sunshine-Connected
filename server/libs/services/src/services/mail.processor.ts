
import { Process, Processor } from '@nestjs/bull';
import {Job} from 'bull'
import { CurMailService } from './mailer.service';
@Processor('mail')
export class MailProcessor{
    constructor(private readonly mailService:CurMailService){}

    
}