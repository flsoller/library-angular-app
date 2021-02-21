import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
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

  @Output() addBook = new EventEmitter<Book>();

  constructor() {}

  onAddBook() {
    const titleInput = this.titleInputRef.nativeElement.value;
    const authorInput = this.authorInputRef.nativeElement.value;
    const pagesInput = this.pagesInputRef.nativeElement.value;
    const isFavInput = this.isFavInputRef.nativeElement.value;
    const isReadingInput = this.isReadingInputRef.nativeElement.value;
    const isLoanedInput = this.isLoanedInputRef.nativeElement.value;

    const newBook = new Book(
      titleInput,
      authorInput,
      pagesInput,
      isFavInput,
      isLoanedInput,
      isReadingInput
    );
    this.addBook.emit(newBook);
  }
}
