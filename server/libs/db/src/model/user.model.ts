import {prop, ModelOptions} from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import {hashSync} from 'bcryptjs'


export enum UserEnum {
    
}
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
    @prop({
        select:false,
        set(val){
            return val?hashSync(val):val
        },
        get(val){
            return val
        }
    })
    password:string



 

}