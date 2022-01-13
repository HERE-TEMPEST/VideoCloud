export class MyError extends Error {
  status: number;
  constructor(msg: string, stat: number) {
    super(msg);
    this.status = stat;
  }
}
