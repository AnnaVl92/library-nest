import type { Response } from 'express';
import { ACCESS_TOKEN_COOKIE, accessTokenCookieOptions } from '../constants';

export function setAccessTokenCookie(res: Response, token: string): void {
  res.cookie(ACCESS_TOKEN_COOKIE, token, accessTokenCookieOptions);
}

export function clearAccessTokenCookie(res: Response): void {
  res.clearCookie(ACCESS_TOKEN_COOKIE);
}

export async function authenticateAndRedirect(
  res: Response,
  authenticate: () => Promise<{ access_token: string }>,
  errorView: string,
  mapError: (error: unknown) => string,
): Promise<void> {
  try {
    const { access_token } = await authenticate();
    setAccessTokenCookie(res, access_token);
    res.redirect('/books');
  } catch (error) {
    res.render(errorView, { error: mapError(error) });
  }
}
