import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';

import {
  User,
  Course,
  Question,
  Action,
  Answer,
  Audit,
  Workshop,
  Progress,
} from './model';
import { Episode } from './model/episode.model';

const models = TypegooseModule.forFeature([
  User,
  Course,
  Question,
  Answer,
  Action,
  Workshop,
  Audit,
  Episode,
  Progress,
]);
@Global()
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        };
      },
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
