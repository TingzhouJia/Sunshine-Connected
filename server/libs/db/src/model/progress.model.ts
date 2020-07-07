import {prop, ModelOptions, } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

import {  Schema } from 'mongoose'
enum ProgressStype{
    PUBLISHED='published',
    STAGE1='stage1',
    STAGE2='stage2',
    FAILED='failed'
}
@ModelOptions({
    schemaOptions:{
        timestamps:true,
       
    }
})

export class Progress {
    @ApiProperty({description:'status of progress'})
    @prop({enum:ProgressStype,})
    status:string
    @prop({required:false})
    message:string
    @prop({enum:['Workshop','Video']})
    types:string
    @prop({refPath:'types',type:Schema.Types.ObjectId})
    obj_id:string

}