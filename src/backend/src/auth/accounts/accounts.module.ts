import { Module } from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { AccountsRepository } from "./accounts.repository";

@Module({
  exports: [AccountsService],
  providers: [AccountsService, AccountsRepository],
})
export class AccountsModule {}
