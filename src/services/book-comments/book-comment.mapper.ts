import type { BookCommentResponseDto } from './dto';
import type { BookCommentDocument } from './schemas';

export function toBookCommentResponse(
  doc: BookCommentDocument,
): BookCommentResponseDto {
  const createdAt = doc.get('createdAt') as Date | undefined;
  const updatedAt = doc.get('updatedAt') as Date | undefined;

  return {
    id: doc._id.toString(),
    bookId: doc.bookId.toString(),
    username: doc.username,
    text: doc.text,
    mentions: doc.mentions ?? [],
    createdAt: createdAt!.toISOString(),
    updatedAt: updatedAt!.toISOString(),
  };
}
