import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/model/user.model';
import {Crud} from 'nestjs-mongoose-crud'
import { ApiTags } from '@nestjs/swagger';

@Crud({model:User})
@Controller('users')
@ApiTags('User')
export class UsersController {
    constructor(@InjectModel(User) private readonly model){ }
    @Get('option')
    option(){
        return {
            title:"课时管路",
            column:[
                {prop:'name',label:"名称"},
                {prop:'cover',label:"封面"},
            ]
        }
    }
}   
