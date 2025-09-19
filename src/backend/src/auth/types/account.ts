import type { Account, User } from "@prisma/client";

export type AccountWithUser = Account & {
  user: User;
};
