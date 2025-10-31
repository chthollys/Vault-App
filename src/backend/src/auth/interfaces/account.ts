import type { Account, User } from "@prisma/client";

export interface AccountWithUser extends Account  {
  user: User;
};
