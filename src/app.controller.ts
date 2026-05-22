import { Controller, Get, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request, Response } from 'express';
import { ACCESS_TOKEN_COOKIE, Public } from './services';

@Public()
@Controller()
export class AppController {
  constructor(private readonly jwtService: JwtService) {}

  @Get()
  root(@Req() req: Request, @Res() res: Response): void {
    const token = req.cookies?.[ACCESS_TOKEN_COOKIE];

    if (typeof token === 'string') {
      try {
        this.jwtService.verify(token);
        res.redirect('/books');
        return;
      } catch {
        // invalid or expired token
      }
    }

    res.redirect('/auth/signin');
  }
}
