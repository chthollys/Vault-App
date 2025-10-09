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
