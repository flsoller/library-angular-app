import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BooksService } from 'src/app/shared/books.service';
import { ModalService } from 'src/app/shared/modal.service';
import { Book } from '../book.model';

import { BookModalComponent } from './book-modal.component';

describe('BookModalComponent', () => {
  let component: BookModalComponent;
  let fixture: ComponentFixture<BookModalComponent>;
  let debugEl: DebugElement;

  const booksServiceMock = {
    addBook: jest.fn().mockImplementation(() => of({})),
  };

  const modalServiceMock = {
    toggleModal: jest.fn().mockImplementation(() => of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookModalComponent],
      providers: [
        { provide: BooksService, useValue: booksServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookModalComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onAddBook method', () => {
    spyOn(component, 'onAddBook');
    component.onAddBook();
    expect(component.onAddBook).toHaveBeenCalled();
  });

  it('should call books service addBook method and toggle modal', () => {
    const bookServiceSpy = jest.spyOn(booksServiceMock, 'addBook');
    const modalServiceSpy = jest.spyOn(modalServiceMock, 'toggleModal');
    const book = new Book(
      (component.titleInputRef.nativeElement.value = 'Title'),
      (component.authorInputRef.nativeElement.value = 'Author'),
      (component.pagesInputRef.nativeElement.value = 100),
      (component.isFavInputRef.nativeElement.checked = true),
      (component.isLoanedInputRef.nativeElement.checked = false),
      (component.isReadingInputRef.nativeElement.checked = true)
    );

    component.onAddBook();

    expect(bookServiceSpy).toHaveBeenCalledTimes(1);
    expect(bookServiceSpy).toHaveBeenCalledWith(book);
    expect(modalServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should call modal service toggle method on cancel', () => {
    const modalServiceSpy = jest.spyOn(modalServiceMock, 'toggleModal');
    component.onCancel();
    expect(modalServiceSpy).toHaveBeenCalledTimes(1);
  });
});
