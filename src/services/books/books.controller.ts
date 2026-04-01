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

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): IBook[] {
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBook(@Param('id') id: string): IBook {
    return this.booksService.getBook(id);
  }

  @Post()
  createBook(@Body() book: Partial<IBook>): IBook {
    return this.booksService.createBook(book);
  }

  @Put(':id')
  updateBook(@Param('id') id: string, @Body() updatedBook: IBook): IBook {
    return this.booksService.updateBook(id, updatedBook);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string): IBook {
    return this.booksService.deleteBook(id);
  }
}
