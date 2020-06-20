import { prop, ModelOptions } from "@typegoose/typegoose";
@ModelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class Episode{
    @prop()
    name:string
    @prop()
    file:string
}