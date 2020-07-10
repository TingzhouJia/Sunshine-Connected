import { Module, Global } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@libs/db';
import { JwtModule } from '@nestjs/jwt';


import { RoleModule } from '@app/role';
import { ServicesModule } from '@app/services';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //envFilePath:`${process.env.NODE_ENV || 'development'}.env`,
    }),
    DbModule,
    RoleModule,
    ServicesModule,
    JwtModule.registerAsync({
      useFactory() {
        return { secret: process.env.SECRET };
      },
    }),
  ],
  providers: [CommonService],
  exports: [CommonService, JwtModule],
})
export class CommonModule {}
