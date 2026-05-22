import type { Request } from 'express';
import type { JwtValidatedUser } from '../strategies';

export type AuthenticatedRequest = Request & { user: JwtValidatedUser };
