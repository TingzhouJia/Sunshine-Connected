import {prop, ModelOptions} from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

@ModelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class User{
    @ApiProperty({description:'username',example:"user1"})
    @prop()
    username:string
    @ApiProperty({description:'username',example:"pass1"})
    @prop()
    password:string
}