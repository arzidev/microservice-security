export class Response<T> {
  code: number;
  message: string;
  data?: T;
}
