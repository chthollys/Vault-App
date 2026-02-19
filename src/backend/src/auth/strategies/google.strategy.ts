import { Profile, Strategy } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";
import { BadGatewayException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AccountsService } from "../accounts/accounts.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private usersService: UsersService,
    private accountsService: AccountsService,
    private configService: ConfigService,
  ) {
    const backendUrl =
      configService.get<string>("BACKEND_URL") || "http://localhost:8000";

    super({
      clientID: configService.getOrThrow<string>("GOOGLE_ID"),
      clientSecret: configService.getOrThrow<string>("GOOGLE_SECRET"),
      callbackURL: `${backendUrl}/auth/google/callback`,
      scope: ["email", "profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const providerAccountId = profile.id;
    const image = profile.photos?.[0]?.value;
    const name = profile.displayName || profile.username;

    if (!email) {
      throw new BadGatewayException("Google profile didn't provide an email");
    }

    const existingUser = await this.usersService.upsertByEmailForOauth(email, {
      name,
      image,
    });

    let account = await this.accountsService.findOrCreateOAuthAccount({
      provider: "google",
      type: "oauth",
      userId: existingUser.id,
      providerAccountId,
      tokens: { access_token: accessToken, refresh_token: refreshToken },
    });

    return account.user;
  }
}
