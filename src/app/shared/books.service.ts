import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../books/book.model';
import { FilterService } from './filter.service';

@Injectable({ providedIn: 'root' })
export class BooksService {
  libraryChanged = new EventEmitter<Book[]>();

  constructor(private filterService: FilterService) {}

  private books: Book[] = [
    new Book('Some Title 1', 'Some Author 1', 100, true, false, false),
    new Book('Some Title 2', 'Some Author 2', 200, false, true, false),
    new Book('Some Title 3', 'Some Author 3', 300, false, false, true),
  ];

  private filteredBooks: Book[] = [];

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

  getIsReading() {
    this.filteredBooks = this.filterService.viewIsReading(this.books);
    this.libraryChanged.emit([...this.filteredBooks]);
  }

  getIsLoaned() {
    this.filteredBooks = this.filterService.viewLoaned(this.books);
    this.libraryChanged.emit([...this.filteredBooks]);
  }

  getIsFav() {
    this.filteredBooks = this.filterService.viewFavourite(this.books);
    this.libraryChanged.emit([...this.filteredBooks]);
  }

  getAll() {
    this.filteredBooks = this.books;
    this.libraryChanged.emit([...this.filteredBooks]);
  }
}
