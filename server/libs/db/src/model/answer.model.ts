import { ModelOptions, prop, Ref } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { Question } from "./question.model";
import { User } from "./user.model";

@ModelOptions({schemaOptions:{timestamps:true},options:{customName:"Answer"}})
export class Answer{
    @ApiProperty({description:'related question'})
    @prop({ref:'Question'})
    question:Ref<Question>
    
    @ApiProperty({description:'author of answer'})
    @prop({ref:'User'})
    author:Ref<User>
    @ApiProperty({description:'content of answer'})
    @prop()
    content:string

    @ApiProperty({description:'is posted or not'})
    @prop()
    isDraft:boolean
}