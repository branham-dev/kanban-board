import type { ContentfulStatusCode } from 'hono/utils/http-status';

export class AppError extends Error {
  public readonly statusCode: ContentfulStatusCode;
  public readonly errors: Record<string, string[]> | null;

  constructor(
    message: string,
    statusCode: ContentfulStatusCode = 500,
    errors: Record<string, string[]> | null,
  ) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
