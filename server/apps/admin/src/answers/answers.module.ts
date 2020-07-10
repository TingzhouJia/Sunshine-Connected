import { Module } from '@nestjs/common';
import { AnswersController } from './answers.controller';
import { AnswersService } from './answers.service';
import { AnswerRepository } from '@libs/db/repository';
import { AuditRepository } from '@libs/db/repository/audit.repository';

@Module({
  imports: [AuditRepository],
  controllers: [AnswersController],
  providers: [AnswersService, AnswerRepository],
})
export class AnswersModule {}
