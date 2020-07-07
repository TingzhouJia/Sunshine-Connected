import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/model/user.model';
import {Crud} from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';

@Crud({model:User})
@Controller('users')
@ApiTags('User')
export class UsersController {
    constructor(@InjectModel(User) private readonly model:ReturnModelType<typeof User>){ }
   
    
}   
