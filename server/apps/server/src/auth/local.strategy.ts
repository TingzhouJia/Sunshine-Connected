import {Strategy,IStrategyOptions} from 'passport-local'
import {PassportStrategy} from '@nestjs/passport'
import { InjectModel } from 'nestjs-typegoose'
import { User } from '@libs/db/model/user.model'
import { ReturnModelType } from '@typegoose/typegoose'
import { BadRequestException } from '@nestjs/common'
import {compareSync} from 'bcryptjs'
export class LocalStrategy extends PassportStrategy(Strategy,'local'){
    constructor(@InjectModel(User) private model:ReturnModelType<typeof User>){
        super({usernameField:'username',passwordField:'password'} as IStrategyOptions)
    }
    async validate(username:string,password:string){
        const user=await this.model.findOne({username}).select('+password')
        if(!user){
            throw new BadRequestException('wrong username')
        }
        if(!compareSync(password,user.password)){
            throw new BadRequestException('密码不正确')
        }
        return user;
    }
}