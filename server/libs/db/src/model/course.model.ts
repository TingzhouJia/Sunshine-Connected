import {prop, Ref, ModelOptions, } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { User } from './user.model'
import { Question } from './question.model'



@ModelOptions({
    schemaOptions:{
        timestamps:true,
        toJSON:{virtuals:true}
    }
})

export class Course{
    @ApiProperty({description:'video name'})
    @prop()
    title:string
    @ApiProperty({description:'covering',example:"pass1"})
    @prop()
    cover:string
    @prop({ref:Question,localField:'_id',foreignField:'course'})
    questions:Ref<Question>[]
    @prop()
    file:string
    @ApiProperty({description:'author'})
    @prop({ref:User})
    author:Ref<User>

    @ApiProperty({description:'category of post',})
    @prop()
    progress:string
    


}