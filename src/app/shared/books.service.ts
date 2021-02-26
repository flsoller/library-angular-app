import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../books/book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  libraryChanged = new EventEmitter<Book[]>();

  private books: Book[] = [
    new Book('Some Title 1', 'Some Author 1', 100, true, false, false),
    new Book('Some Title 2', 'Some Author 2', 200, false, true, false),
    new Book('Some Title 3', 'Some Author 3', 300, false, false, true),
  ];

  getBooks() {
    return [...this.books];
  }

  addBook(newBook: Book) {
    this.books.push(newBook);
    this.libraryChanged.emit([...this.books]);
  }

  removeBook(title: string) {
    this.books = this.books.filter((book) => {
      return book.title === title ? null : book;
    });
    this.libraryChanged.emit([...this.books]);
  }
}
