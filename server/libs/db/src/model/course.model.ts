import {prop, Ref, ModelOptions, } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { User } from './user.model'
import { Question } from './question.model'
import { Action } from 'rxjs/internal/scheduler/Action'
import { Progress } from './progress.model'



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
    @prop({ref:Question,localField:'_id',foreignField:'course._id'})
    questions:Ref<Question>[]
    @prop()
    file:string
    @ApiProperty({description:'author'})
    @prop({ref:User,localField:'author._id',foreignField:'_id'})
    author:Ref<User>

    @ApiProperty({description:'category of post',})
    @prop({ref:Progress,localField:'_id',foreignField:'obj_id',})
    progress:Ref<Progress>
    
    @ApiProperty({description:'view count'})
    @prop({ref:Action,localField:'_id',foreignField:'object._id',count:true,})
    viewedCount:Ref<Action<Course>>[]


}