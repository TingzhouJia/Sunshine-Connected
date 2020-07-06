import { ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.model";
import { Course } from "./course.model";
import { Workshop } from "./workshop.model";

@ModelOptions({
    options:{customName:'Audit'},
    schemaOptions:{timestamps:true}
})

export class Audit{
    @ApiProperty({description:'user send request'})
    @prop({ref:User})
    sender:Ref<User>
    @ApiProperty({description:'type need audit'})
    @prop({enum:['Workshop','Course']})
    type:string
    @ApiProperty({description:'object of audit'})
    @prop({refPath:'type'})
    object:Ref<Workshop|Course>
    @ApiProperty({description:'deadline for audit'})
    @prop()
    deadline:Date
    @ApiProperty({description:'progress for audit'})
    @prop()
    progress:number

    @ApiProperty({description:'leaving message'})
    @prop()
    message:string[]



}