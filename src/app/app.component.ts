import { Component, OnInit } from '@angular/core';
import { Book } from './books/book.model';
import { BooksService } from './shared/books.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BooksService],
})
export class AppComponent implements OnInit {
  books: Book[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.books = this.booksService.books;
  }

  showModal = false;
  displayModal(status: boolean) {
    this.showModal = status;
  }
}
