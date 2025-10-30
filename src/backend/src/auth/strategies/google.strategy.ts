import { Profile, Strategy } from "passport-google-oauth20";
import { PassportStrategy } from "@nestjs/passport";
import { BadGatewayException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AccountsService } from "../accounts/accounts.service";
import { API_HOST, FRONTEND_URL, GOOGLE_ID, GOOGLE_SECRET } from "utils/env";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private usersService: UsersService,
    private accountsService: AccountsService,
  ) {
    super({
      clientID: GOOGLE_ID!,
      clientSecret: GOOGLE_SECRET!,
      callbackURL: `${API_HOST}/auth/google/callback`,
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

    const existingUser = await this.usersService.upsertByEmail(email, {
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
