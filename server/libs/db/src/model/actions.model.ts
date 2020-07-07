import { prop, ModelOptions, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";
import { Course } from "./course.model";
import { Episode } from "./episode.model";
import { ApiProperty } from "@nestjs/swagger";
import { BaseModel } from "./base.model";

@ModelOptions({
    options:{
        customName:"Action"
    },
    schemaOptions:{
        timestamps:true,
        
    }
})
export class Action {
    @ApiProperty({description:'user who act'})
    @prop({ref:"User"})
    user:Ref<User>
    @ApiProperty({description:'type of target'})
    @prop({enum:['Course','User','Workshop']})
    type:string
    @ApiProperty({description:'object of target'})
    @prop({refPath:'type'})
    object:Ref<Course|User>
    @ApiProperty({description:'type of action'})
    @prop({enum:['like','subscribe','register']})
    name:string

}