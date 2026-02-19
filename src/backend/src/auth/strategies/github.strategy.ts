import { BadGatewayException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";
import { UsersService } from "src/users/users.service";
import { AccountsService } from "../accounts/accounts.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    private usersService: UsersService,
    private accountService: AccountsService,
    private configService: ConfigService,
  ) {
    const backendUrl =
      configService.get<string>("BACKEND_URL") || "http://localhost:8000";

    super({
      clientID: configService.getOrThrow<string>("GITHUB_ID"),
      clientSecret: configService.getOrThrow<string>("GITHUB_SECRET"),
      callbackURL: `${backendUrl}/auth/github/callback`,
      scope: ["email", "profile"],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const email = profile.emails?.[0]?.value;
    const providerAccountId = profile.id;
    const image = profile.photos?.[0]?.value;
    const name = profile.displayName || profile.username;

    if (!email) {
      throw new BadGatewayException("Github profile didn't provide an email");
    }

    const existingUser = await this.usersService.upsertByEmailForOauth(email, {
      name,
      image,
    });

    let account = await this.accountService.findOrCreateOAuthAccount({
      provider: "github",
      providerAccountId,
      type: "oauth",
      userId: existingUser.id,
      tokens: { access_token: accessToken, refresh_token: refreshToken },
    });

    return account.user;
  }
}
