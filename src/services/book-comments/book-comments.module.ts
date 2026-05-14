import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookComment, BookCommentSchema } from './schemas';
import { BookCommentsService } from './book-comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentsService],
  exports: [BookCommentsService],
})
export class BookCommentsModule {}
