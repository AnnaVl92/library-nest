export interface BookCommentResponseDto {
  id: string;
  bookId: string;
  username: string;
  text: string;
  mentions: string[];
  createdAt: string;
  updatedAt: string;
}
