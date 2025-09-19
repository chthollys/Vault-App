import { handlePrismaError } from "utils/prisma.util";

export class PrismaErrorCatcher {
  protected readonly errorHandler = handlePrismaError;
}
