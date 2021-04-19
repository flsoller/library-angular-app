import { BooksService } from './books.service';
import { Book } from '../books/book.model';
import { FilterService } from './filter.service';
import { StorageService } from './storage.service';

const mockBookLibrary = [
  new Book(' Title', 'Some Author', 100, false, false, false),
];

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
    let book: Book = new Book(
      'New Book Title',
      'New Book Author',
      200,
      false,
      false,
      false
    );
    const storageSpy = jest.spyOn(storage, 'saveToLocalStorage');

    service.addBook(book);

    expect(storageSpy).toHaveBeenCalled();
    expect(service.getBooks().length).toBe(2);
    expect(service.getBooks()[1].author).toBe('New Book Author');
    expect(emitterSpy).toHaveBeenCalled();

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

    expect(storageSpy).toBeCalled();
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

    expect(storageSpy).toHaveBeenCalled();
    expect(emitterSpy).toHaveBeenCalled();
  });

  it('Calls filter service method isReading', () => {
    const filterSpy = jest.spyOn(filter, 'viewIsReading');

    service.getIsReading();

    expect(filterSpy).toHaveBeenCalled();
    expect(emitterSpy).toHaveBeenCalled();
  });

  it('Calls filter service method isLoaned', () => {
    const filterSpy = jest.spyOn(filter, 'viewLoaned');

    service.getIsLoaned();

    expect(filterSpy).toHaveBeenCalled();
    expect(emitterSpy).toHaveBeenCalled();
  });

  it('Calls filter service method viewFavourite', () => {
    const filterSpy = jest.spyOn(filter, 'viewFavourite');

    service.getIsFav();

    expect(filterSpy).toHaveBeenCalled();
    expect(emitterSpy).toHaveBeenCalled();
  });

  it('Emits change on getAll method call', () => {
    service.getAll();
    expect(emitterSpy).toHaveBeenCalled();
  });
});
