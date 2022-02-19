export type Optional<T> = T | undefined | null;

export interface BaseResponse<T> {
  message: string;
  status: string;
  data: T;
}
