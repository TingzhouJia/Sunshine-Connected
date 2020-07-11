import { Module } from '@nestjs/common';
import { ActionsService } from './actions.service';
import { ActionsController } from './actions.controller';
import { ActionRepository } from '@libs/db/repository';

@Module({
  imports:[ActionRepository],
  providers: [ActionsService,ActionRepository],
  controllers: [ActionsController],
})
export class ActionsModule {}
