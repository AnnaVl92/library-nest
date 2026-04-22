import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BooksInterceptor } from './books.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksInterceptor],
})
export class BooksModule {}
