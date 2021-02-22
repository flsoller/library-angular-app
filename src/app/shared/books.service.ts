import { Book } from '../books/book.model';

export class BooksService {
  books: Book[] = [
    new Book('Some Title 1', 'Some Author 1', 100, true, false, false),
    new Book('Some Title 2', 'Some Author 2', 200, false, true, false),
    new Book('Some Title 3', 'Some Author 3', 300, false, false, true),
  ];

  addBook(newBook: Book) {
    this.books.push(newBook);
  }
}
