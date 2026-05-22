import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookComment, BookCommentDocument } from './schemas';
import { CreateBookCommentDto, UpdateBookCommentDto } from './dto';
import { BooksService } from '../books';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name)
    private bookCommentModel: Model<BookCommentDocument>,
    private readonly booksService: BooksService,
  ) {}

  async createBookComment(
    data: CreateBookCommentDto,
  ): Promise<BookCommentDocument> {
    const doc = new this.bookCommentModel({
      bookId: new Types.ObjectId(data.bookId),
      username: data.username,
      text: data.text,
      mentions: data.mentions ?? [],
    });
    const saved = await doc.save();
    await this.booksService.incrementCommentsCount(data.bookId);

    return saved;
  }

  async getBookComments(): Promise<BookCommentDocument[]> {
    return this.bookCommentModel.find().exec();
  }

  async getBookComment(id: string): Promise<BookCommentDocument> {
    const comment = await this.bookCommentModel.findById(id).exec();
    if (!comment) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return comment;
  }

  async updateBookComment(
    id: string,
    data: UpdateBookCommentDto,
  ): Promise<BookCommentDocument> {
    const comment = await this.bookCommentModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!comment) {
      throw new Error(`Comment with id ${id} not found`);
    }
    return comment;
  }

  async deleteBookComment(id: string): Promise<BookCommentDocument> {
    const comment = await this.bookCommentModel.findByIdAndDelete(id).exec();
    if (!comment) {
      throw new Error(`Comment with id ${id} not found`);
    }
    await this.booksService.decrementCommentsCount(comment.bookId.toString());

    return comment;
  }

  async findAllBookComment(bookId: string): Promise<BookCommentDocument[]> {
    return this.bookCommentModel
      .find({ bookId: new Types.ObjectId(bookId) })
      .sort({ createdAt: -1 })
      .exec();
  }
}
