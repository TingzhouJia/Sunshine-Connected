import { ModelOptions ,prop, Ref} from "@typegoose/typegoose";
import { ApiProperty } from '@nestjs/swagger'
import { Course } from "./course.model";
import { User } from "./user.model";
import { Answer } from "./answer.model";

@ModelOptions({
    options:{
        customName:'Question'
    },
    schemaOptions:{
        timestamps:true,
        toJSON:{virtuals:true}
    }
})

export class Question{
    @ApiProperty({description:'related course'})
    @prop({ref:'Course'})
    course:Ref<Course>
    
    @ApiProperty({description:'user ask question'})
    @prop({ref:'User'})
    author:Ref<User>

    @ApiProperty({description:'whether answered officially'})
    @prop()
    isAnswered:boolean

    @ApiProperty({description:"question name"})
    @prop()
    content:string

    @ApiProperty({description:'timing of question'})
    @prop()
    timing:string

    @ApiProperty({description:'answer to question'})
    @prop({ref:'Answer',localField:'_id',foreignField:'question'})
    answer:Ref<Answer>[]
}