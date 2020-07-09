import { ModelOptions, prop, Ref, post, getModelForClass, DocumentType } from "@typegoose/typegoose";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "./user.model";
import { Course } from "./course.model";
import { Workshop } from "./workshop.model";
import { Progress, ProgressType } from "./progress.model";


@ModelOptions({
    options:{customName:'Audit'},
    schemaOptions:{timestamps:true}
})
@post('save',function(doc:DocumentType<Audit>){
    getModelForClass(Progress).updateOne({_id:doc.progress_id},{status:ProgressType.STAGE2,auditer_id:doc.auditor_id,message:doc.message})
})
export class Audit{
    @ApiProperty({description:'user  audit'})
    @prop({ref:'User',localField:'author_id',foreignField:'_id'})
    auditer:Ref<User>
    @ApiProperty({description:'sender id'})
    @prop()
    auditor_id:string
    @ApiProperty({description:'type need audit'})
    @prop({enum:['Workshop','Course']})
    type:string
    @ApiProperty({description:'object of audit'})
    @prop({refPath:'type',localField:'obj_id',foreignField:"_id"})
    object:Ref<Workshop|Course>
    @ApiProperty({description:"target id"})
    @prop()
    obj_id:string
    @ApiProperty({description:'deadline for audit'})
    @prop()
    deadline:Date
    @ApiProperty({description:'progress for audit'})
    @prop({ref:'Progress',localField:'progress_id',foreignField:'_id'})
    progress:Ref<Progress>

    @ApiProperty({description:'progress id'})
    @prop()
    progress_id:string

    @prop({required:false})
    message:string






}