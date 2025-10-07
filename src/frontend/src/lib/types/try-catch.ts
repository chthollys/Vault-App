export type SuccessResult<T> = Readonly<[T, null]>;

export type ErrorResult<E = Error> = Readonly<[null, E]>;

export type Result<T, E = Error> = SuccessResult<T> | ErrorResult<E>;

export async function tryCatch<T, E = Error>(
  fn: () => Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await fn();
    return [data, null] as const;
  } catch (err) {
    return [null, err as E] as const;
  }
}
