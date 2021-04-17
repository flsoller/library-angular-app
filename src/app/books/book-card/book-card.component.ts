import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

import { BooksService } from 'src/app/shared/books.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  editIsReading: boolean;
  editIsFav: boolean;
  editIsLoaned: boolean;

  isEdit = false;

  // Define color for material component (slider)
  color: ThemePalette = 'primary';

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.editIsReading = this.book.isReading;
    this.editIsFav = this.book.isFav;
    this.editIsLoaned = this.book.isLoaned;
  }

  onDeleteBook(title: string) {
    this.booksService.removeBook(title);
  }

  onEditBook() {
    if (this.isEdit) {
      this.booksService.updateBook(
        this.book.title,
        this.editIsReading,
        this.editIsFav,
        this.editIsLoaned
      );
    }
    this.isEdit = !this.isEdit;
  }
}
