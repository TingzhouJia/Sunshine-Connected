import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseRepository, AuditRepository } from '@libs/db/repository';
import { MailQueueModule,  } from '@app/mail-queue';



@Module({
  imports: [CourseRepository,MailQueueModule,AuditRepository],
  controllers: [CoursesController],
  providers: [CoursesService,CourseRepository,AuditRepository],
})
export class CoursesModule {}
