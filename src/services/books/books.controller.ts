import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type IBook from './types';
import { BookDocument } from './schemas';
import { BooksInterceptor } from './books.interceptor';
import { ValidationPipe } from './books.validation.pipe';

@UseInterceptors(BooksInterceptor)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Promise<BookDocument[]> {
    return this.booksService.getBooks();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  getBook(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.getBook(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() book: Partial<IBook>): Promise<BookDocument> {
    return this.booksService.createBook(book);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateBook(
    @Param('id') id: string,
    @Body() updatedBook: IBook,
  ): Promise<BookDocument> {
    return this.booksService.updateBook(id, updatedBook);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  deleteBook(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.deleteBook(id);
  }
}
