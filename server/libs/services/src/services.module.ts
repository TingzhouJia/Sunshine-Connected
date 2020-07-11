import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CurMailService } from './services/mailer.service';
import { MailProcessor } from './services/mail.processor';
@Module({
  imports:[
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => configService.get('mailer'),
    
      inject:[ConfigService],
      
    }),
    BullModule.registerQueue({name:'mail'})
  ],
  providers: [ServicesService,CurMailService,MailProcessor],
  exports: [ServicesService,CurMailService],
})
export class ServicesModule {}
