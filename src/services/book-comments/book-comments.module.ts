import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from '../books';
import { BookComment, BookCommentSchema } from './schemas';
import { BookCommentsService } from './book-comments.service';
import { BookCommentsGateway } from './book-comments.gateway';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentsService, BookCommentsGateway],
  exports: [BookCommentsService, BookCommentsGateway],
})
export class BookCommentsModule {}
