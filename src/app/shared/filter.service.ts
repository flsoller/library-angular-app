import { Injectable } from '@angular/core';
import { Book } from '../books/book.model';

@Injectable({ providedIn: 'root' })
export class FilterService {
  private libraryView: Book[] = [];

  viewAll(library: Book[]) {
    this.libraryView = library;
    return [...this.libraryView];
  }

  viewFavourite(library: Book[]) {
    this.libraryView = library.filter((book) => {
      return book.isFav ? book : null;
    });
    return [...this.libraryView];
  }

  viewLoaned(library: Book[]) {
    this.libraryView = library.filter((book) => {
      return book.isLoaned ? book : null;
    });
    return [...this.libraryView];
  }

  viewIsReading(library: Book[]) {
    this.libraryView = library.filter((book) => {
      return book.isReading ? book : null;
    });
    return [...this.libraryView];
  }
}
