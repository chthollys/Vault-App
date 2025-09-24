import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { MAIL_TRANSPORT } from "utils/constants";
import type { Transporter } from "nodemailer";
import { EMAIL_FROM } from "utils/env";

type MailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

@Injectable()
export class MailService implements OnModuleInit {
  constructor(
    @Inject(MAIL_TRANSPORT) private readonly transporter: Transporter,
  ) {}
  async onModuleInit() {
    try {
      await this.transporter.verify();
    } catch (err) {
      throw Error("Mail service failing.");
    }
  }
  send(options: MailOptions) {
    return this.transporter.sendMail({
      from: EMAIL_FROM,
      ...options,
    });
  }
}
