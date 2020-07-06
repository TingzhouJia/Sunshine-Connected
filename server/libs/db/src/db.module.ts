import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './model/user.model';
import { Course } from './model/course.model';
import { Question } from './model/question.model';
import { Answer } from './model/answer.model';
import { Action } from './model/actions.model';

const models=TypegooseModule.forFeature([User,Course,Question,Answer,Action])
@Global()
@Module({
  imports:[
    TypegooseModule.forRootAsync({
      
      useFactory(){
        return { uri:process.env.DB,useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false}
      }
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}

