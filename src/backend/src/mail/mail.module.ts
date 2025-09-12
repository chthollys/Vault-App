import { Module } from "@nestjs/common";
import nodemailer from "nodemailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailService } from "./mail.service";
import { MAIL_TRANSPORT } from "utils/constants";

@Module({
  imports: [ConfigModule],
  providers: [
    MailService,
    {
      provide: MAIL_TRANSPORT,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const host = config.get<string>("EMAIL_SERVER_HOST");
        const port = Number(config.get<string>("EMAIL_SERVER_PORT") ?? 465);
        const user = config.get<string>("EMAIL_SERVER_USER");
        const pass = config.get<string>("EMAIL_SERVER_PASSWORD");
        const secure = port === 465;
        return nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
        });
      },
    },
  ],
  exports: [MailService],
})
export class MailModule {}
