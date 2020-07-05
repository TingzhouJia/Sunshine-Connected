import { ModelOptions ,prop} from "@typegoose/typegoose";
import { ApiProperty } from '@nestjs/swagger'

@ModelOptions({
    options:{
        customName:'Question'
    },
    schemaOptions:{
        timestamps:true
    }
})

export class Question{
    
}