import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  AuthService,
  Public,
  authenticateAndRedirect,
  clearAccessTokenCookie,
  type SignInDto,
  type SignUpDto,
} from '../../services';
import { getQueryError } from '../shared';

@Controller('auth')
export class AuthViewsController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('signin')
  @Render('auth/signin')
  signInPage(@Req() req: Request) {
    return { error: getQueryError(req) };
  }

  @Public()
  @Post('signin')
  async signInPost(
    @Body() dto: SignInDto,
    @Res() res: Response,
  ): Promise<void> {
    await authenticateAndRedirect(
      res,
      () => this.authService.signIn(dto),
      'auth/signin',
      (error) =>
        error instanceof UnauthorizedException
          ? 'Invalid email or password'
          : 'Sign in failed',
    );
  }

  @Public()
  @Get('signup')
  @Render('auth/signup')
  signUpPage(@Req() req: Request) {
    return { error: getQueryError(req) };
  }

  @Public()
  @Post('signup')
  async signUpPost(
    @Body() dto: SignUpDto,
    @Res() res: Response,
  ): Promise<void> {
    await authenticateAndRedirect(
      res,
      () => this.authService.signUp(dto),
      'auth/signup',
      (error) =>
        error instanceof ConflictException
          ? 'User with this email already exists'
          : 'Sign up failed',
    );
  }

  @Public()
  @Post('logout')
  logout(@Res() res: Response): void {
    clearAccessTokenCookie(res);
    res.redirect('/auth/signin');
  }
}
