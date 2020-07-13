import { User } from "./user.model";
import { Ref, prop, mongoose, ModelOptions } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";


@ModelOptions({
    schemaOptions:{
        timestamps:true,
        _id:true,
        
    },
    options:{customName:'Event'}
})
export class Event{
    @ApiProperty({description:'ref to user'})
    @prop({ref:'User', type:mongoose.Types.ObjectId,localField:'author',foreignField:'_id',justOne:true})
    author:Ref<User>

    @ApiProperty({description:'summary of event'})
    @prop()
    summary:string

    @ApiProperty({description:'description of event'})
    @prop()
    description:string

    @prop()
    start:string

    @prop()
    end:string

    @prop()
    recurence:string[]

    @prop({ref:'User',localField:''})
    attendee:Ref<User>[]



}