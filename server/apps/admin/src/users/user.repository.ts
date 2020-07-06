import { type } from "os";
import { User } from "@libs/db/model/user.model";
import { ReturnModelType,DocumentType } from "@typegoose/typegoose";
import { InjectModel } from "nestjs-typegoose";


export type UserEntity=User
export type UserModel = ReturnModelType<typeof User>;


export class UserRepository {
    constructor(@InjectModel(User) private readonly model:UserModel){
       
    }

    async create(doc:User):Promise<DocumentType<User>>{
        doc.username=doc.username?doc.username:doc.email
        const user=await this.model.create(doc)
        return user.save()
    }

    
    
}