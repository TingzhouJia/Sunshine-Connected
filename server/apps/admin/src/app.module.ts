import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@libs/db';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesController } from './episodes/episodes.controller';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from 'libs/common/src';
import { AnswersModule } from './answers/answers.module';

const MAO = require('multer-aliyun-oss');
@Module({
  imports: [
    CommonModule,

  
    UsersModule,
    CoursesModule,
    EpisodesModule,
    AnswersModule
  ],
  controllers: [AppController, EpisodesController],
  providers: [AppService],

})
export class AppModule {}
