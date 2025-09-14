import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { VerificationTokenService } from "src/verification-token/verification-token.service";
import { MailService } from "src/mail/mail.service";
import type { RegisterDto } from "src/dtos";
import type { JwtPayload } from "./types/payload";
import type { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: VerificationTokenService,
    private mailService: MailService,
  ) {}
  async registerEmailForOtp(email: string): Promise<{
    message: string;
  }> {
    const existingUser = await this.usersService.existByEmail(email);
    if (existingUser) {
      throw new ConflictException("Email already registered, please login");
    }

    const expires = new Date(Date.now() + 5 * 60 * 1000);
    const { token } = await this.tokenService.create(email, expires);
    await this.mailService.send({
      to: email,
      subject: "Vault App - OTP Verification Code",
      text: `Your OTP code is ${token}`,
      html: `<p>Your OTP code is:</p><h2>${token}</h2>`,
    });
    return { message: "OTP sent succesfully" };
  }

  async verifyOtp(otp: string, email: string) {
    const [existingRecord, validRecord] = await Promise.all([
      await this.tokenService.findOne(email),
      await this.tokenService.findOne(email, otp),
    ]);
    // No request otp has made
    if (!existingRecord) {
      throw new BadRequestException("Register your email first to receive OTP");
    }
    // Invalid otp
    if (!validRecord) {
      throw new BadRequestException("Invalid OTP");
    }
    // OTP expires
    if (validRecord.expires < new Date()) {
      throw new BadRequestException("OTP has expired");
    }

    await this.tokenService.deleteAll(email);
    return { message: "OTP verified succesfully" };
  }

  async createAccount(email: string, password: string): Promise<User> {
    const newUser = await this.usersService.create({ email, password });
    return newUser;
  }

  async logout() {}
}
