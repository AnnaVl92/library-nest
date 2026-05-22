import type { BookDocument } from '../../services';

export interface SerializedBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
  commentsCount: number;
}

export function prepareBookForView(doc: BookDocument): SerializedBook {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    authors: doc.authors,
    favorite: doc.favorite,
    fileCover: doc.fileCover,
    fileName: doc.fileName,
    fileBook: doc.fileBook,
    commentsCount: doc.commentsCount ?? 0,
  };
}
