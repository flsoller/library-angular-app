import { Component } from '@angular/core';
import { Book } from './books/book.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showModal = false;

  books: Book[] = [
    new Book('Some Title 1', 'Some Author 1', 100, true, false, false),
    new Book('Some Title 2', 'Some Author 2', 200, false, true, false),
    new Book('Some Title 3', 'Some Author 3', 300, false, false, true),
  ];

  displayModal(status: boolean) {
    this.showModal = status;
  }
}
