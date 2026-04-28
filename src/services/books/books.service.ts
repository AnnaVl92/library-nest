import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Book, BookDocument } from './schemas';
import IBook from './types';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async createBook(book: Partial<IBook>): Promise<BookDocument> {
    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async getBook(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new Error(`Книга с id ${id} не найдена`);
    }
    return book;
  }

  async getBooks(): Promise<BookDocument[]> {
    return this.bookModel.find().exec();
  }

  async updateBook(
    id: string,
    updatedBook: Partial<IBook>,
  ): Promise<BookDocument> {
    const book = await this.bookModel
      .findByIdAndUpdate(id, updatedBook, { new: true })
      .exec();
    if (!book) {
      throw new Error(`Книга с id ${id} не найдена`);
    }
    return book;
  }

  async deleteBook(id: string): Promise<BookDocument> {
    const book = await this.bookModel.findByIdAndDelete(id).exec();
    if (!book) {
      throw new Error(`Книга с id ${id} не найдена`);
    }
    return book;
  }
}
