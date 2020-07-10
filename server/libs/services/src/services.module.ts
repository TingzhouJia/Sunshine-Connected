import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports:[
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('mailer'),
    
      inject:[ConfigService]
    })
  ],
  providers: [ServicesService],
  exports: [ServicesService],
})
export class ServicesModule {}
