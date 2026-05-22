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
  UseFilters,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDocument } from './schemas';
import { BooksInterceptor } from './books.interceptor';
import {
  BookIdValidationPipe,
  CreateBookValidationPipe,
  UpdateBookValidationPipe,
} from './validation';
import { CreateBookDto, UpdateBookDto } from './dto';
import { HttpExceptionFilter } from './http-exception.filter';

@UseInterceptors(BooksInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('api/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(): Promise<BookDocument[]> {
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBook(
    @Param('id', BookIdValidationPipe) id: string,
  ): Promise<BookDocument> {
    return this.booksService.getBook(id);
  }

  @Post()
  @UsePipes(CreateBookValidationPipe)
  createBook(@Body() book: CreateBookDto): Promise<BookDocument> {
    return this.booksService.createBook(book);
  }

  @Put(':id')
  @UsePipes(UpdateBookValidationPipe)
  updateBook(
    @Param('id', BookIdValidationPipe) id: string,
    @Body() updatedBook: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.updateBook(id, updatedBook);
  }

  @Delete(':id')
  deleteBook(
    @Param('id', BookIdValidationPipe) id: string,
  ): Promise<BookDocument> {
    return this.booksService.deleteBook(id);
  }
}
