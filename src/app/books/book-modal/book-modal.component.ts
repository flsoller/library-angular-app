import { Component, ElementRef, ViewChild } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { ModalService } from 'src/app/shared/modal.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css'],
})
export class BookModalComponent {
  @ViewChild('title') titleInputRef: ElementRef;
  @ViewChild('author') authorInputRef: ElementRef;
  @ViewChild('pages') pagesInputRef: ElementRef;
  @ViewChild('isFav') isFavInputRef: ElementRef;
  @ViewChild('isReading') isReadingInputRef: ElementRef;
  @ViewChild('isLoaned') isLoanedInputRef: ElementRef;

  constructor(
    private booksService: BooksService,
    private modalService: ModalService
  ) {}

  onAddBook() {
    const titleInput = this.titleInputRef.nativeElement.value;
    const authorInput = this.authorInputRef.nativeElement.value;
    const pagesInput = parseInt(this.pagesInputRef.nativeElement.value);
    const isFavInput = this.isFavInputRef.nativeElement.checked;
    const isReadingInput = this.isReadingInputRef.nativeElement.checked;
    const isLoanedInput = this.isLoanedInputRef.nativeElement.checked;

    const book = new Book(
      titleInput,
      authorInput,
      pagesInput,
      isFavInput,
      isLoanedInput,
      isReadingInput
    );

    this.booksService.addBook(book);
    this.modalService.toggleModal();
  }

  onCancel() {
    this.modalService.toggleModal();
  }
}
