import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

class OAuthTokensDto {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;
}

export class CreateOAuthAccountDto {
  @ApiPropertyOptional()
  id?: string | undefined;
  @ApiProperty()
  userId: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  provider: string;
  @ApiProperty()
  providerAccountId: string;
  @ApiPropertyOptional({ nullable: true })
  access_token?: string | null | undefined;
  @ApiPropertyOptional({ nullable: true })
  refresh_token?: string | null | undefined;
  @ApiPropertyOptional({ nullable: true })
  expires_at?: number | null | undefined;
  @ApiPropertyOptional({ nullable: true })
  token_type?: string | null | undefined;
  @ApiPropertyOptional({ nullable: true })
  scope?: string | null | undefined;
  @ApiPropertyOptional({ nullable: true })
  id_token?: string | null | undefined;
  @ApiPropertyOptional({ nullable: true })
  session_state?: string | null | undefined;
  @ApiProperty({ type: () => OAuthTokensDto })
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
