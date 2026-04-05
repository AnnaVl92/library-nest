import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type IBook from './types';
import { BookDocument } from './schemas';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Promise<BookDocument[]> {
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.getBook(id);
  }

  @Post()
  createBook(@Body() book: Partial<IBook>): Promise<BookDocument> {
    return this.booksService.createBook(book);
  }

  @Put(':id')
  updateBook(
    @Param('id') id: string,
    @Body() updatedBook: IBook,
  ): Promise<BookDocument> {
    return this.booksService.updateBook(id, updatedBook);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): Promise<BookDocument> {
    return this.booksService.deleteBook(id);
  }
}
