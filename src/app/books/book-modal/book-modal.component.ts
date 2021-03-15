import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BooksService } from 'src/app/shared/books.service';
import { ModalService } from 'src/app/shared/modal.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css'],
})
export class BookModalComponent {
  bookForm: FormGroup;

  constructor(
    private booksService: BooksService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: [''],
      pages: [1, Validators.required],
      isFav: [false],
      isReading: [false],
      isLoaned: [false],
    });
  }

  onAddBook() {
    const book = new Book(
      this.bookForm.value.title,
      this.bookForm.value.author,
      this.bookForm.value.pages,
      this.bookForm.value.isFav,
      this.bookForm.value.isLoaned,
      this.bookForm.value.isReading
    );

    if (this.bookForm.valid) {
      this.booksService.addBook(book);
      this.modalService.toggleModal();
    }
  }

  onCancel() {
    this.modalService.toggleModal();
  }
}
