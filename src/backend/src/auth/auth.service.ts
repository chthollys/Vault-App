import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { VerificationTokenService } from "src/verification-token/verification-token.service";
import { MailService } from "src/mail/mail.service";
import type {
  AccessToken,
  JwtPayload,
  JwtRefPayload,
  TokenPair,
} from "./types/jwt";
import { UserSignupStep } from "./types/signup-state";
import { RefreshTokenService } from "./refresh-token/refresh-token.service";
import bcrypt from "bcrypt";
import { REFRESH_TOKEN_COOKIE_EXPIRES, SALT_ROUNDS } from "utils/constants";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tokenService: VerificationTokenService,
    private mailService: MailService,
    private refreshTokenService: RefreshTokenService,
  ) {}
  async registerEmailForOtp(email: string): Promise<{
    message: string;
  }> {
    const existingUser = await this.usersService.maybeFindByEmail(email);
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
    return { message: "OTP sent succesfully, please check your mailbox" };
  }

  async verifyOtp(
    otp: string,
    email: string | undefined,
  ): Promise<{ message: string }> {
    if (!email) {
      throw new ForbiddenException("Register your email first to receive OTP");
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
  ): Promise<TokenPair> {
    if (!step || !email || step !== UserSignupStep.SetPassword) {
      throw new BadRequestException("Register and verify your email first");
    }
    const [_, newUser] = await Promise.all([
      await this.usersService.create({ email, password }),
      await this.usersService.verifyEmail(email),
    ]);
    const payload: JwtPayload = { sub: newUser.id, email: newUser.email };
    const { access_token, refresh_token } = await this.issueTokenPair(payload);
    return { access_token, refresh_token };
  }

  async restartSignup(identifier?: string): Promise<{ message: string }> {
    if (!identifier) {
      return { message: "No signup session found" };
    }
    await this.tokenService.deleteAll(identifier);
    return { message: "Signup session restarted" };
  }

  async issueTokenPair(payload: Partial<JwtPayload>): Promise<TokenPair> {
    if (!payload.sub) {
      throw new BadRequestException("Invalid token payload");
    }
    const token = await this.jwtService.signAsync(payload, { expiresIn: "1h" });

    const tokenId = crypto.randomUUID();
    const payloadRef: JwtRefPayload = {
      sub: payload.sub,
      email: payload.email,
      jti: tokenId,
    };
    const refresh_token = await this.jwtService.signAsync(payloadRef, {
      expiresIn: "30d",
    });

    await this.refreshTokenService.create(
      tokenId,
      await bcrypt.hash(tokenId, SALT_ROUNDS),
      payload.sub,
      new Date(Date.now() + REFRESH_TOKEN_COOKIE_EXPIRES),
    );

    return { access_token: token, refresh_token };
  }

  async refreshToken(token: string): Promise<TokenPair> {
    let payload;
    try {
      payload = await this.jwtService.verifyAsync<JwtRefPayload>(token);
    } catch (err) {
      throw new ForbiddenException("Invalid refresh token");
    }
    if (!payload.sub || !payload.email || !payload.jti) {
      throw new BadRequestException("Invalid refresh token payload");
    }

    const storedToken = await this.refreshTokenService.findByTokenId(
      payload.jti,
    );
    if (!storedToken) {
      throw new ForbiddenException("Refresh token has been revoked");
    }

    const isTokenValid = await bcrypt.compare(
      payload.jti,
      storedToken.tokenHash,
    );

    if (!isTokenValid) {
      await this.refreshTokenService.deleteByUserId(payload.sub);
      throw new ForbiddenException("Refresh token has been revoked");
    }

    // Refresh token expired
    if (storedToken.expiresAt < new Date()) {
      await this.refreshTokenService.deleteByTokenId(storedToken.id);
      throw new ForbiddenException(
        "Refresh token has expired, please login again",
      );
    }

    const { access_token, refresh_token } = await this.issueTokenPair({
      sub: payload.sub,
      email: payload.email,
    });

    await this.refreshTokenService.deleteByTokenId(storedToken.id);

    return { access_token, refresh_token };
  }

  async login(email: string, password: string): Promise<TokenPair> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException("Invalid email or password");
    }
    if (!user.password) {
      throw new BadRequestException(
        "Please login with your OAuth provider or reset your password",
      );
    }

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException("Invalid email or password");
    }

    const { access_token, refresh_token } = await this.issueTokenPair({
      sub: user.id,
      email: user.email,
    });
    return { access_token, refresh_token };
  }

  async logout(userId?: string) {
    if (!userId) {
      return;
    }
    const isDeleted = (await this.refreshTokenService.deleteByUserId(userId))
      .count;
    if (!isDeleted) {
      throw new BadRequestException("No active session found");
    }
    return;
  }
}
