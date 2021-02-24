import { BooksService } from './books.service';
import { Book } from '../books/book.model';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    service = new BooksService();
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
});
