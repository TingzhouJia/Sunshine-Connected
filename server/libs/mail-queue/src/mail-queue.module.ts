import { Module, Global } from '@nestjs/common';
import { MailQueueService } from './mail-queue.service';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './mail.processor';
import { CurMailService } from '@app/services/services/mailer.service';
import { AuditRepository, CourseRepository } from '@libs/db/repository';
@Global()
@Module({
  imports:[
    BullModule.registerQueue({name:'mail'})
  ],
  providers:[MailProcessor,AuditRepository,CourseRepository,CurMailService,MailQueueService],
  exports:[MailProcessor,MailQueueService]
})
export class MailQueueModule {}
