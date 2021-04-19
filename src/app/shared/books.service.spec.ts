import { BooksService } from './books.service';
import { Book } from '../books/book.model';
import { FilterService } from './filter.service';
import { StorageService } from './storage.service';

const mockBookLibrary = [
  new Book(' Title', 'Some Author', 100, false, false, false),
];

const mockBook = new Book(
  'New Book Title',
  'New Book Author',
  200,
  false,
  false,
  false
);

describe('BooksService', () => {
  let service: BooksService;
  let filter: FilterService;
  let storage: StorageService;
  let emitterSpy: jest.SpyInstance;

  beforeEach(() => {
    filter = new FilterService();
    storage = new StorageService();
    service = new BooksService(filter, storage);
    emitterSpy = jest.spyOn(service.libraryChanged, 'emit');

    service['books'] = mockBookLibrary;
  });

  afterEach(() => {
    emitterSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('Adds a new book to library', () => {
    const storageSpy = jest.spyOn(storage, 'saveToLocalStorage');

    service.addBook(mockBook);

    expect(storageSpy).toHaveBeenCalledWith(service['books']);
    expect(service.getBooks().length).toBe(2);
    expect(service.getBooks()[1]).toEqual(mockBook);
    expect(emitterSpy).toHaveBeenCalledWith(service['books']);

    storageSpy.mockRestore();
  });

  it('Returns array of books', () => {
    const storageSpy = jest.spyOn(storage, 'getFromLocalStorage');

    service.getBooks();

    expect(storageSpy).toHaveBeenCalled();
    expect(service.getBooks().length).toBe(2);

    storageSpy.mockRestore();
  });

  it('Updates book', () => {
    const storageSpy = jest.spyOn(storage, 'saveToLocalStorage');

    service.updateBook('New Book Title', true, true, true);

    expect(storageSpy).toHaveBeenCalledWith(service['books']);
    expect(emitterSpy).toHaveBeenCalledWith(service['books']);
    expect(service.getBooks()[1].isFav).toBe(true);
    expect(service.getBooks()[1].isLoaned).toBe(true);
    expect(service.getBooks()[1].isReading).toBe(true);
  });

  it('Removes book from library', () => {
    const storageSpy = jest.spyOn(storage, 'saveToLocalStorage');

    // Does not remove any books
    service.removeBook('Does not exist');
    expect(service.getBooks().length).toBe(2);

    // Does remove book
    service.removeBook('New Book Title');
    expect(service.getBooks().length).toBe(1);

    expect(storageSpy).toHaveBeenCalledWith(service['books']);
    expect(emitterSpy).toHaveBeenCalledWith(service['books']);
  });

  it('Calls filter service method isReading', () => {
    const filterSpy = jest.spyOn(filter, 'viewIsReading');

    service.getIsReading();

    expect(filterSpy).toHaveBeenCalledWith(service['books']);
    expect(emitterSpy).toHaveBeenCalledWith(service['filteredBooks']);
  });

  it('Calls filter service method isLoaned', () => {
    const filterSpy = jest.spyOn(filter, 'viewLoaned');

    service.getIsLoaned();

    expect(filterSpy).toHaveBeenCalledWith(service['books']);
    expect(emitterSpy).toHaveBeenCalledWith(service['filteredBooks']);
  });

  it('Calls filter service method viewFavourite', () => {
    const filterSpy = jest.spyOn(filter, 'viewFavourite');

    service.getIsFav();

    expect(filterSpy).toHaveBeenCalledWith(service['books']);
    expect(emitterSpy).toHaveBeenCalledWith(service['filteredBooks']);
  });

  it('Emits change on getAll method call', () => {
    service.getAll();
    expect(emitterSpy).toHaveBeenCalledWith(service['filteredBooks']);
  });
});
