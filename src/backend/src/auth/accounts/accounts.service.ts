import { Injectable } from "@nestjs/common";
import { AccountsRepository } from "./accounts.repository";
import { CreateOAuthAccountDto } from "../dtos/create-oauth-account.dto";
import type { AccountWithUser } from "../types/account";

@Injectable()
export class AccountsService {
  constructor(private accountsRepo: AccountsRepository) {}
  async findIncludeUser(
    provider: string,
    providerAccountId: string,
  ): Promise<AccountWithUser | null> {
    return await this.accountsRepo.findOneIncludeUser({
      provider_providerAccountId: { provider, providerAccountId },
    });
  }

  async findOrCreateOAuthAccount(
    params: CreateOAuthAccountDto,
  ): Promise<AccountWithUser> {
    return await this.accountsRepo.upsertWithUser({
      where: {
        provider_providerAccountId: {
          provider: params.provider,
          providerAccountId: params.providerAccountId,
        },
      },
      create: {
        provider: params.provider,
        providerAccountId: params.providerAccountId,
        type: params.type,
        user: { connect: { id: params.userId } },
        ...params.tokens,
      },
      update: {
        access_token: params.tokens?.access_token,
        refresh_token: params.tokens?.refresh_token,
        expires_at: params.expires_at,
        scope: params.scope,
        token_type: params.token_type,
        id_token: params.id_token,
        session_state: params.session_state,
      },
      include: { user: true },
    });
  }
}
