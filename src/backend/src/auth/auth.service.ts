import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { VerificationTokenService } from "src/verification-token/verification-token.service";
import { MailService } from "src/mail/mail.service";
import type { JwtPayload } from "./types/payload";
import type { User } from "@prisma/client";
import { UserSignupStep } from "./types/signup-state";

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

    const { token } = await this.tokenService.upcreate(email);
    await this.mailService.send({
      to: email,
      subject: "Vault App - OTP Verification Code",
      text: `Your OTP code is ${token}`,
      html: `<p>Your OTP code is:</p><h2>${token}</h2>`,
    });
    return { message: "OTP sent succesfully" };
  }

  async verifyOtp(otp: string, email: string | undefined) {
    if (!email) {
      throw new BadRequestException("Register your email first to receive OTP");
    }
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

  async createAccount(
    step: UserSignupStep | undefined,
    email: string | undefined,
    password: string,
  ): Promise<{ access_token: string }> {
    if (!step || !email || step !== UserSignupStep.SetPassword) {
      throw new BadRequestException("Register and verify your email first");
    }
    const [_, newUser] = await Promise.all([
      await this.usersService.create({ email, password }),
      await this.usersService.verifyEmail(email),
    ]);
    const payload: JwtPayload = { sub: newUser.id, email: newUser.email };
    const token = await this.jwtService.signAsync(payload, { expiresIn: "1h" });
    return { access_token: token };
  }

  async restartSignup(identifier?: string): Promise<{ message: string }> {
    if (!identifier) {
      return { message: "No signup session found" };
    }
    await this.tokenService.deleteAll(identifier);
    return { message: "Signup session restarted" };
  }

  async logout() {}
}
