import {
  applyDecorators,
  NestInterceptor,
  UseInterceptors,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { Observable, map } from "rxjs";

export function Serialize<T>(dto: ClassConstructor<T>) {
  return applyDecorators(UseInterceptors(new SerializeInterceptor(dto)));
}

export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private dto: ClassConstructor<T>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        map((data: any) =>
          plainToInstance(this.dto, data, { excludeExtraneousValues: true }),
        ),
      );
  }
}
