import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';

import { CommonModule } from 'libs/common/src';
import { AnswersModule } from './answers/answers.module';
import { QuestionsModule } from './questions/questions.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
    AnswersModule,
    QuestionsModule,
    AuditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
