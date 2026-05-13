/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookDocument } from './schemas';

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: jest.MockedObject<BooksService>;

  const mockBook = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Book',
    description: 'Test Description',
    authors: 'Test Author',
    favorite: 'true',
    fileCover: 'cover.jpg',
    fileName: 'test.pdf',
    fileBook: 'test.txt',
  } as unknown as BookDocument;

  beforeEach(async () => {
    const mockBooksService = {
      getBooks: jest.fn(),
      getBook: jest.fn(),
      createBook: jest.fn(),
      updateBook: jest.fn(),
      deleteBook: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    booksService = module.get(BooksService);
  });

  describe('/GET books', () => {
    it('should return all books', async () => {
      const books = [mockBook];
      booksService.getBooks.mockResolvedValue(books);

      const result = await controller.getBooks();

      expect(booksService.getBooks).toHaveBeenCalled();
      expect(result).toEqual(books);
    });
  });

  describe('/GET books/:id', () => {
    it('should return a book by id', async () => {
      booksService.getBook.mockResolvedValue(mockBook);

      const result = await controller.getBook('507f1f77bcf86cd799439011');

      expect(booksService.getBook).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockBook);
    });
  });

  describe('/POST books', () => {
    it('should create a new book', async () => {
      const createDto = {
        title: 'Test Book',
        description: 'Test Description',
        authors: 'Test Author',
      };
      booksService.createBook.mockResolvedValue({
        ...createDto,
        _id: '507f1f77bcf86cd799439011',
      } as unknown as BookDocument);

      const result = await controller.createBook(createDto);

      expect(booksService.createBook).toHaveBeenCalledWith(createDto);
      expect(result).toEqual({
        ...createDto,
        _id: '507f1f77bcf86cd799439011',
      });
    });
  });

  describe('/PUT books/:id', () => {
    it('should update a book', async () => {
      const updateDto = { title: 'Updated Book' };
      const updatedBook = { ...mockBook, ...updateDto };
      booksService.updateBook.mockResolvedValue(
        updatedBook as unknown as BookDocument,
      );

      const result = await controller.updateBook(
        '507f1f77bcf86cd799439011',
        updateDto,
      );

      expect(booksService.updateBook).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateDto,
      );
      expect(result).toEqual(updatedBook);
    });
  });

  describe('/DELETE books/:id', () => {
    it('should delete a book', async () => {
      booksService.deleteBook.mockResolvedValue(mockBook);

      const result = await controller.deleteBook('507f1f77bcf86cd799439011');

      expect(booksService.deleteBook).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockBook);
    });
  });
});
