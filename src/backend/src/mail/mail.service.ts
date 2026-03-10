import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { MAIL_TRANSPORT } from "utils/constants";
import type { Transporter } from "nodemailer";

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
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("❌ Mail service failed to initialize:", errorMessage);
    }
  }
  send(options: MailOptions) {
    return this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      ...options,
    });
  }
}
