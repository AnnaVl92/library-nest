import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  authors: string;

  @Prop()
  favorite?: string;

  @Prop()
  fileCover?: string;

  @Prop()
  fileName?: string;

  @Prop()
  fileBook?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
