import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('aurthentication')
@Controller('auth')
export class AuthController {
    @Post('register')
    async register(@Body() body){
        
    }
    @Post('login')
    async login(){

    }
}
