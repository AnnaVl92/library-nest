import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Book } from '../../books';

export type BookCommentDocument = HydratedDocument<BookComment>;

@Schema({ collection: 'comments', timestamps: true })
export class BookComment {
  @Prop({
    type: Types.ObjectId,
    ref: Book.name,
    required: true,
    index: true,
  })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
