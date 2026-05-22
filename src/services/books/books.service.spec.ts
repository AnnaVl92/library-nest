/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BooksService } from './books.service';
import { Book, BookDocument } from './schemas';

describe('BooksService', () => {
  let service: BooksService;
  let mockModel: Partial<Record<keyof Model<BookDocument>, jest.Mock>>;

  const mockBook = {
    _id: '507f1f77bcf86cd799439011',
    title: 'Test Book',
    description: 'Test Description',
    authors: 'Test Author',
    favorite: 'true',
    fileCover: 'cover.jpg',
    fileName: 'test.pdf',
    fileBook: 'test.txt',
  };

  beforeEach(async () => {
    const createMock = () => {
      const instance = {
        save: jest.fn(),
      };
      return Object.assign(
        jest.fn().mockImplementation(() => instance),
        {
          find: jest.fn(),
          findById: jest.fn(),
          findByIdAndUpdate: jest.fn(),
          findByIdAndDelete: jest.fn(),
          exec: jest.fn(),
        },
      );
    };

    mockModel = createMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    mockModel = module.get(getModelToken(Book.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const createBookDto = {
        title: 'Test Book',
        description: 'Test Description',
        authors: 'Test Author',
      };
      const savedBook = { ...createBookDto, _id: '507f1f77bcf86cd799439011' };

      const mockSave = jest.fn().mockResolvedValue(savedBook);
      const MockModelClass = jest.fn().mockImplementation(() => ({
        save: mockSave,
      }));
      Object.assign(MockModelClass, mockModel);

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          BooksService,
          {
            provide: getModelToken(Book.name),
            useValue: MockModelClass,
          },
        ],
      }).compile();

      const serviceWithMock = module.get<BooksService>(BooksService);
      const result = await serviceWithMock.createBook(createBookDto);

      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(savedBook);
    });
  });

  describe('getBook', () => {
    it('should return a book by id', async () => {
      mockModel.findById!.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBook),
      });

      const result = await service.getBook('507f1f77bcf86cd799439011');

      expect(mockModel.findById).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockBook);
    });

    it('should throw an error if book not found', async () => {
      mockModel.findById!.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getBook('507f1f77bcf86cd799439011')).rejects.toThrow(
        'Book with id 507f1f77bcf86cd799439011 not found',
      );
    });
  });

  describe('getBooks', () => {
    it('should return all books', async () => {
      const books = [mockBook];
      mockModel.find!.mockReturnValue({
        exec: jest.fn().mockResolvedValue(books),
      });

      const result = await service.getBooks();

      expect(mockModel.find).toHaveBeenCalled();
      expect(result).toEqual(books);
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const updateDto = { title: 'Updated Book' };
      const updatedBook = { ...mockBook, ...updateDto };

      mockModel.findByIdAndUpdate!.mockReturnValue({
        exec: jest.fn().mockResolvedValue(updatedBook),
      });

      const result = await service.updateBook(
        '507f1f77bcf86cd799439011',
        updateDto,
      );

      expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        updateDto,
        { new: true },
      );
      expect(result).toEqual(updatedBook);
    });

    it('should throw an error if book not found', async () => {
      mockModel.findByIdAndUpdate!.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.updateBook('507f1f77bcf86cd799439011', { title: 'Updated' }),
      ).rejects.toThrow('Book with id 507f1f77bcf86cd799439011 not found');
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      mockModel.findByIdAndDelete!.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockBook),
      });

      const result = await service.deleteBook('507f1f77bcf86cd799439011');

      expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
      );
      expect(result).toEqual(mockBook);
    });

    it('should throw an error if book not found', async () => {
      mockModel.findByIdAndDelete!.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.deleteBook('507f1f77bcf86cd799439011'),
      ).rejects.toThrow('Book with id 507f1f77bcf86cd799439011 not found');
    });
  });
});
