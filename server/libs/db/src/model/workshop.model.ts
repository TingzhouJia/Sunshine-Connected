import { ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.model";

@ModelOptions({
    options:{customName:'Workshop'},
    schemaOptions:{timestamps:true,toJSON:{virtuals:true}}
})
export class Workshop{
    @ApiProperty({description:'workshop title'})
    @prop()
    title:string

    @ApiProperty({description:'introduction'})
    @prop()
    introduction:string

    @ApiProperty({description:'due date'})
    @prop()
    deadline:string

    @ApiProperty({description:'applied volunteer'})
    @prop({ref:User,localField:'_id'})
    applied:Ref<User>[]

}