export class CreateBookCommentDto {
  bookId: string;

  username: string;

  text: string;

  mentions?: string[];
}
