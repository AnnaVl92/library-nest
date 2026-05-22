import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  BookCommentsService,
  BookIdValidationPipe,
  type AuthenticatedRequest,
} from '../../services';
import { BooksViewsService } from './books-views.service';

@Controller('books')
export class BooksViewsController {
  constructor(
    private readonly booksViewsService: BooksViewsService,
    private readonly commentsService: BookCommentsService,
  ) {}

  @Get()
  @Render('books/index')
  async index(@Req() req: AuthenticatedRequest) {
    const books = await this.booksViewsService.getBooksForView();

    return {
      books,
      user: req.user,
    };
  }

  @Get(':id')
  async show(
    @Param('id', BookIdValidationPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ): Promise<void> {
    try {
      const { book, comments } =
        await this.booksViewsService.getBookWithComments(id);

      res.render('books/show', {
        book,
        comments,
        user: req.user,
      });
    } catch {
      res.redirect('/books');
    }
  }

  @Post(':id/comments')
  async createComment(
    @Param('id', BookIdValidationPipe) id: string,
    @Body('text') text: string,
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ): Promise<void> {
    await this.commentsService.createBookComment({
      bookId: id,
      username: req.user.firstName,
      text,
    });

    res.redirect(`/books/${id}`);
  }
}
