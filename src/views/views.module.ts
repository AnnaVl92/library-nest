import { Module } from '@nestjs/common';
import { AuthModule, BooksModule, BookCommentsModule } from '../services';
import { AuthViewsController } from './auth';
import { BooksViewsController, BooksViewsService } from './books';

@Module({
  imports: [AuthModule, BooksModule, BookCommentsModule],
  controllers: [AuthViewsController, BooksViewsController],
  providers: [BooksViewsService],
})
export class ViewsModule {}
