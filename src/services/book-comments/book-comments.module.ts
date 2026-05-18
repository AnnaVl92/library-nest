import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookComment, BookCommentSchema } from './schemas';
import { BookCommentsService } from './book-comments.service';
import { BookCommentsGateway } from './book-comments.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentsService, BookCommentsGateway],
  exports: [BookCommentsService, BookCommentsGateway],
})
export class BookCommentsModule {}
