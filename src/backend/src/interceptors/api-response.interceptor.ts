import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, map } from "rxjs";
import type { ApiResponse } from "@repo/types";

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data: any) => {
        if (typeof data === "string") {
          return { success: true, message: data } as ApiResponse;
        }
        if (data === undefined || data === null) {
          return {
            success: true,
            message: "Operation successful",
          } as ApiResponse;
        }
        return { success: true, data } as ApiResponse<T>;
      }),
    );
  }
}
