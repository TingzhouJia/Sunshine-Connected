import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { MailerModule, HandlebarsAdapter } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurMailService } from './services/mailer.service';
import { AuditRepository, CourseRepository } from '@libs/db/repository';

import { MailQueueModule } from '@app/mail-queue';


@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        transport: {
          host: process.env.SMTP_HOST || 'localhost',
          port: parseInt(process.env.SMTP_PORT, 10) || 1025,
          secure: process.env.SMTP_SECURE === 'true',
          ignoreTLS: process.env.SMTP_SECURE !== 'false',
          auth: {
            user: process.env.SMTP_AUTH_USER || 'username',
            pass: process.env.SMTP_AUTH_PASS || 'password',
          },
        },
        default: {
          from: ''
        },
        template: {
          dir: `${process.cwd()}/templates/`,
          adapter: new HandlebarsAdapter(),
        },
      }),
      inject: [ConfigService],

    }),
    MailQueueModule,
  ],
  providers: [ServicesService, CurMailService,],
  exports: [ServicesService, CurMailService],
})
export class ServicesModule { }
