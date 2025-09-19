import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-github2";

export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor() {
    super({
      clientID: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      callbackURL: process.env.FRONTEND_URL!,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    return {}
  }
}
