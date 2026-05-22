import { Injectable } from '@nestjs/common';
import {
  BooksService,
  BookCommentsService,
  toBookCommentResponse,
} from '../../services';
import { prepareBookForView } from '../shared';

@Injectable()
export class BooksViewsService {
  constructor(
    private readonly booksService: BooksService,
    private readonly commentsService: BookCommentsService,
  ) {}

  async getBooksWithComments() {
    const books = await this.booksService.getBooks();

    return Promise.all(
      books.map(async (book) => ({
        ...prepareBookForView(book),
        comments: (
          await this.commentsService.findAllBookComment(book._id.toString())
        ).map(toBookCommentResponse),
      })),
    );
  }

  async getBookForView(id: string) {
    const book = await this.booksService.getBook(id);

    return prepareBookForView(book);
  }
}
