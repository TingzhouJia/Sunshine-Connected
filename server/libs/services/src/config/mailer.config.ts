import { registerAs } from "@nestjs/config";
import {HandlebarsAdapter} from '@nestjs-modules/mailer'

export default registerAs('mailer',()=>({
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
    default:{
      from:''
    },
    template: {
      dir: `${process.cwd()}/templates/`,
      adapter: new HandlebarsAdapter(),
    },
}))