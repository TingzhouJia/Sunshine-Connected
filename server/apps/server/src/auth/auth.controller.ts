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
import { AuthService } from './auth.service';

@ApiTags('aurthentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly userService:AuthService,private jwtService:JwtService ){}
    @Post('register')
    @ApiOperation({summary:"registration"})
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
            token:this.jwtService.sign(String(user._id)),
            user
        }
    }
    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getUser(@CurrentUser() user:DocumentType<User>){
        return user._id
    }
}
