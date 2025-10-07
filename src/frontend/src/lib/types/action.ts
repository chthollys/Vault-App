import type { Result } from "./try-catch";
import { isOk } from "./try-catch";

export type ActionSuccess<T> = Readonly<{
  success: true;
  data: T;
  message?: string;
}>;

export type ActionFailure<E = string> = Readonly<{
  success: false;
  error: E;
  message?: string;
}>;

export type ActionResult<T, E = string> = ActionSuccess<T> | ActionFailure<E>;

export type Action<T, E = string> = Promise<ActionResult<T, E>>;

export const actionSuccess = <T>(
  data: T,
  meta?: { message?: string }
): ActionSuccess<T> => ({
  success: true,
  data,
  message: meta?.message,
});

export const actionFailure = <E = string>(
  error: E,
  meta?: { message?: string }
): ActionFailure<E> => ({
  success: false,
  error,
  message: meta?.message,
});

export const fromResult = <T, E, F = E>(
  result: Result<T, E>,
  options?: {
    mapError?: (error: E) => F;
    successMessage?: string;
    errorMessage?: string;
  }
): ActionResult<T, F> => {
  if (isOk(result)) {
    return actionSuccess(result.data, { message: options?.successMessage });
  }

  const error = options?.mapError
    ? options.mapError(result.error)
    : ((result.error as unknown) as F);

  return actionFailure(error, { message: options?.errorMessage });
};
