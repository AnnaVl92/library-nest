import type { Request } from 'express';

export function getQueryError(req: Request): string | null {
  return typeof req.query.error === 'string' ? req.query.error : null;
}
