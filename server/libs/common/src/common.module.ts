import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import {ConfigModule} from '@nestjs/config'
import { DbModule } from '@libs/db';
import {JwtModule} from '@nestjs/jwt'
import { RoleModule } from 'libs/role/src';
@Global()
@Module({
  imports:[ConfigModule.forRoot({isGlobal:true}),DbModule,RoleModule,JwtModule.registerAsync({useFactory(){return {secret:process.env.SECRET}}})],
  providers: [CommonService],
  exports: [CommonService,JwtModule],
})
export class CommonModule {}
