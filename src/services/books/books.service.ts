import { Injectable } from '@nestjs/common';
import books from './data.json';
import IBook from './types';

@Injectable()
export class BooksService {
  private books: IBook[] = books;

  createBook(book: Partial<IBook>): IBook {
    const newBook = {
      id: `b-${String(this.books.length + 1).padStart(3, '0')}`,
      ...book,
    } as IBook;
    this.books.push(newBook);
    return newBook;
  }

  getBook(id: string): IBook {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new Error(`Книга с id ${id} не найдена`);
    }
    return book;
  }

  getBooks(): IBook[] {
    return this.books;
  }

  updateBook(id: string, updatedBook: IBook): IBook {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error(`Книга с id ${id} не найдена`);
    }
    this.books[index] = { ...this.books[index], ...updatedBook };
    return this.books[index];
  }

  deleteBook(id: string): IBook {
    const index = this.books.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error(`Книга с id ${id} не найдена`);
    }
    const [deletedBook] = this.books.splice(index, 1);
    return deletedBook;
  }
}
