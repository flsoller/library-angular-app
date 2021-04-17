import { EventEmitter, Injectable } from '@angular/core';
import { Book } from '../books/book.model';
import { FilterService } from './filter.service';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class BooksService {
  libraryChanged = new EventEmitter<Book[]>();

  constructor(
    private filterService: FilterService,
    private storageService: StorageService
  ) {}

  private books: Book[] = [];

  private filteredBooks: Book[] = [];

  getBooks() {
    this.books = this.storageService.getFromLocalStorage();
    return [...this.books];
  }

  addBook(newBook: Book) {
    this.books.push(newBook);
    this.storageService.saveToLocalStorage(this.books);
    this.libraryChanged.emit([...this.books]);
  }

  removeBook(title: string) {
    this.books = this.books.filter((book) => {
      return book.title === title ? null : book;
    });
    this.storageService.saveToLocalStorage(this.books);
    this.libraryChanged.emit([...this.books]);
  }

  updateBook(
    title: string,
    isReading: boolean,
    isFav: boolean,
    isLoaned: boolean
  ) {
    this.books = this.books.filter((book) => {
      if (book.title === title) {
        book.isReading = isReading;
        book.isFav = isFav;
        book.isLoaned = isLoaned;
      }
      return book;
    });
    this.storageService.saveToLocalStorage(this.books);
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
