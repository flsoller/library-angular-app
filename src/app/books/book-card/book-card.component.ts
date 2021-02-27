import { Component, Input, OnInit } from '@angular/core';

import { BooksService } from 'src/app/shared/books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  @Input() book: Book;

  constructor(private booksService: BooksService) {}

  onDeleteBook(title: string) {
    this.booksService.removeBook(title);
  }
}
