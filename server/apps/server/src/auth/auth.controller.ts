import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/model/user.model';
import { ReturnModelType,DocumentType } from '@typegoose/typegoose';
import {AuthGuard} from '@nestjs/passport'
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';
import {JwtService} from '@nestjs/jwt'
import { CurrentUser } from './currentUser.decorator';

@ApiTags('aurthentication')
@Controller('auth')
export class AuthController {
    constructor(@InjectModel(User) private usermodel:ReturnModelType<typeof User>,private jwtService:JwtService ){}
    @Post('register')
    @ApiOperation({summary:"注册"})
    async register(@Body() body:Register){
            const {username,password}=body
          //  const user=await this.usermodel.create({username,password})
          //  return user
    }
    @Post('login')
    @ApiOperation({summary:'login'})
    @UseGuards(AuthGuard('local'))
    async login(@CurrentUser() user:DocumentType<User>,@Body() body:Login){
        return {
            token:this.jwtService.sign(String(user._id))
        }
    }
    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getUser(@CurrentUser() user:DocumentType<User>){
        return user._id
    }
}
