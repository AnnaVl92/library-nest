import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Request } from 'express';
import type { JwtPayload } from '../interfaces';
import { ACCESS_TOKEN_COOKIE } from '../constants';

/** Payload attached to `request.user` after successful JWT validation. */
export interface JwtValidatedUser {
  id: string;
  email: string;
  firstName: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request | undefined) =>
          typeof req?.cookies?.[ACCESS_TOKEN_COOKIE] === 'string'
            ? req.cookies[ACCESS_TOKEN_COOKIE]
            : null,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
    });
  }

  validate(payload: JwtPayload): JwtValidatedUser {
    return {
      id: payload.id,
      email: payload.email,
      firstName: payload.firstName,
    };
  }
}
