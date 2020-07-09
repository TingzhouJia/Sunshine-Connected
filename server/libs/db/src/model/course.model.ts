import {prop, Ref, ModelOptions, Post, getModelForClass, } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { User } from './user.model'
import { Question } from './question.model'

import { Progress } from './progress.model'




@ModelOptions({
    schemaOptions:{
        timestamps:true,
        toJSON:{virtuals:true}
    }
})
@Post('remove',function(doc){
    console.log('remove questions when remove course')
    getModelForClass(Question).remove({course_id:doc._id})})
@Post('findOneAndRemove',function(doc){
    console.log('remove question when remove course')
    getModelForClass(Question).remove({course_id:doc._id})})
@Post('save',function(doc){
    console.log('create progress')
})
export class Course{
    @ApiProperty({description:'video name'})
    @prop()
    title:string
    @ApiProperty({description:'covering',example:"pass1"})
    @prop()
    cover:string
    @prop({ref:'Question',localField:'_id',foreignField:'course_id'})
    questions:Ref<Question>[]
    @prop({ref:'Question',localField:'_id',foreignField:'course_id',count:true})
    questionCount:number
    @prop()
    file:string
    @ApiProperty({description:'author'})
    @prop({ref:'User',localField:'author_id',foreignField:'_id',justOne:true})
    author:Ref<User>

    @ApiProperty({description:'author_id'})
    @prop()
    author_id:string

    @ApiProperty({description:'category of post',})
    @prop({ref:'Progress',localField:'_id',foreignField:'obj_id',justOne:true})
    progress?:Ref<Progress>

    @ApiProperty({description:'if video is in progress then it should be false'})
    @prop({default:false})
    published:boolean
    
    @ApiProperty({description:'view count'})
    @prop({ref:'Action',localField:'_id',foreignField:'obj_id',count:true,match:{name:'view'},default:0})
    viewedCount:number

    @ApiProperty({description:'view count'})
    @prop({ref:'Action',localField:'_id',foreignField:'obj_id',count:true,match:{name:'like'},default:0})
    likeCount:number




}