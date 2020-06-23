import {prop, Ref, ModelOptions, } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'
@ModelOptions({
    schemaOptions:{
        timestamps:true,
        toJSON:{virtuals:true}
    }
})

export class Course{
    @ApiProperty({description:'课程名称'})
    @prop()
    title:string
    @ApiProperty({description:'封面',example:"pass1"})
    @prop()
    cover:string

    @ApiProperty({description:'课时'})
    @prop({ref:Episode,localField:'_id',foreignField:"course"})
    episodes:Ref<Episode>[]

}