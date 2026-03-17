import type { Account, User } from "src/prisma/client";

export interface AccountWithUser extends Account  {
  user: User;
};
