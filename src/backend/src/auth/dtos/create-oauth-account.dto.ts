export class CreateOAuthAccountDto {
  id?: string | undefined;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  access_token?: string | null | undefined;
  refresh_token?: string | null | undefined;
  expires_at?: number | null | undefined;
  token_type?: string | null | undefined;
  scope?: string | null | undefined;
  id_token?: string | null | undefined;
  session_state?: string | null | undefined;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}
