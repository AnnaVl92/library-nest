import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksInterceptor } from './books.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas';
import {
  CreateBookValidationPipe,
  UpdateBookValidationPipe,
  BookIdValidationPipe,
} from './validation';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    BooksInterceptor,
    CreateBookValidationPipe,
    UpdateBookValidationPipe,
    BookIdValidationPipe,
  ],
})
export class BooksModule {}
