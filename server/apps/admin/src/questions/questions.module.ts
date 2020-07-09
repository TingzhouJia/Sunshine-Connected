import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { QuestionRepository } from '@libs/db/repository';

@Module({
  imports:[QuestionRepository],
  controllers: [ QuestionsController],
  providers: [QuestionsService,QuestionRepository]
})
export class QuestionsModule {}
