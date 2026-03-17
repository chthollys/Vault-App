import { Expose } from "class-transformer";
import type { AuthUser } from "../interfaces/jwt";
import { UserSessionDto } from "@repo/types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class AuthUserResponseDto implements AuthUser {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional({ nullable: true })
  name?: string | null;

  @ApiPropertyOptional({ nullable: true })
  image?: string | null;
}

export class CurrentUserDto implements UserSessionDto {
  @ApiPropertyOptional({ type: () => AuthUserResponseDto, nullable: true })
  @Expose()
  user: AuthUser | null;
}
