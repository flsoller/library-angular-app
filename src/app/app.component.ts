import { Component, OnInit } from '@angular/core';
import { Book } from './books/book.model';
import { BooksService } from './shared/books.service';
import { ModalService } from './shared/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  books: Book[] = [];
  showModal: boolean = true;

  constructor(
    private booksService: BooksService,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    this.books = this.booksService.getBooks();
    this.booksService.libraryChanged.subscribe((books: Book[]) => {
      this.books = books;
    });

    this.showModal = this.modalService.getModalState();
    this.modalService.modalVisChanged.subscribe((visState: boolean) => {
      this.showModal = visState;
    });
  }
}
