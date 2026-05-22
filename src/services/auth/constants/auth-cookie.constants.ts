export const ACCESS_TOKEN_COOKIE = 'access_token';

export const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
};
