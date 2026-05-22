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

  async getBooksForView() {
    const books = await this.booksService.getBooks();

    return books.map(prepareBookForView);
  }

  async getBookWithComments(id: string) {
    const book = prepareBookForView(await this.booksService.getBook(id));
    const comments = (
      await this.commentsService.findAllBookComment(id)
    ).map(toBookCommentResponse);

    return { book, comments };
  }
}
