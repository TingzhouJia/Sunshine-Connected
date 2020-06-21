import { Module, Global } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose'
import { User } from './model/user.model';
import { Course } from './model/course.model';

const models=TypegooseModule.forFeature([User,Course])
@Global()
@Module({
  imports:[
    TypegooseModule.forRoot('mongodb://localhost/topfullstack',{
      useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:false
    }),
    models
  ],
  providers: [DbService],
  exports: [DbService,models],
})
export class DbModule {}

