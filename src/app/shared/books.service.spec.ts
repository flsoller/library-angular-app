import { BooksService } from './books.service';
import { Book } from '../books/book.model';
import { FilterService } from './filter.service';

describe('BooksService', () => {
  let service: BooksService;
  let filter: FilterService;

  beforeEach(() => {
    filter = new FilterService();
    service = new BooksService(filter);
  });

  it('Returns array of books', () => {
    expect(service.getBooks().length).toBe(3);
    expect(service.getBooks()[1].author).not.toBe('Some Author 1');
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
    service.addBook(book);
    expect(service.getBooks().length).toBe(4);
    expect(service.getBooks()[3].author).toBe('Some Author 4');
  });

  it('Removes book from library', () => {
    service.removeBook('Some Title 1');
    expect(service.getBooks().length).toBe(2);
    expect(service.getBooks()[0].title).not.toBe('Some Title 1');
  });
});
