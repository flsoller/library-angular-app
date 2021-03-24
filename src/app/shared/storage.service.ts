import { Injectable } from '@angular/core';
import { Book } from '../books/book.model';

@Injectable({ providedIn: 'root' })
export class StorageService {
  STORAGE_STRING = 'angular-library';

  getFromLocalStorage(): Book[] {
    try {
      return localStorage.getItem(this.STORAGE_STRING)
        ? JSON.parse(localStorage.getItem(this.STORAGE_STRING))
        : [];
    } catch (error) {
      console.error(error);
    }
  }

  saveToLocalStorage(library: Book[]) {
    try {
      const serializedLibrary = JSON.stringify(library);
      localStorage.setItem(this.STORAGE_STRING, serializedLibrary);
    } catch (error) {
      console.error(error);
    }
  }
}
