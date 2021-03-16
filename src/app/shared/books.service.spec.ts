import { BooksService } from './books.service';
import { Book } from '../books/book.model';
import { FilterService } from './filter.service';
import { StorageService } from './storage.service';

describe('BooksService', () => {
  let service: BooksService;
  let filter: FilterService;
  let storage: StorageService;

  beforeEach(() => {
    filter = new FilterService();
    storage = new StorageService();
    service = new BooksService(filter, storage);
  });

  it('Adds a new book to library', () => {
    let book: Book = new Book(
      'Some Title 4',
      'Some Author 4',
      400,
      false,
      false,
      false
    );
    const storageSpy = jest.spyOn(storage, 'saveToLocalStorage');

    service.addBook(book);

    expect(storageSpy).toHaveBeenCalled();
    expect(service.getBooks().length).toBe(1);
    expect(service.getBooks()[0].author).toBe('Some Author 4');

    storageSpy.mockRestore();
  });

  it('Returns array of books', () => {
    const storageSpy = jest.spyOn(storage, 'getFromLocalStorage');

    service.getBooks();

    expect(storageSpy).toHaveBeenCalled();
    expect(service.getBooks().length).toBe(1);

    storageSpy.mockRestore();
  });

  it('Removes book from library', () => {
    const storageSpy = jest.spyOn(storage, 'saveToLocalStorage');

    service.removeBook('Some Title 4');

    expect(storageSpy).toHaveBeenCalled();
    expect(service.getBooks().length).toBe(0);
  });
});
