import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        Validators,
        FormsModule,
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

    component.bookForm.controls['title'].setValue('Title');
    component.bookForm.controls['author'].setValue('Author');
    component.bookForm.controls['pages'].setValue(100);
    component.bookForm.controls['isFav'].setValue(true);
    component.bookForm.controls['isLoaned'].setValue(true);
    component.bookForm.controls['isReading'].setValue(false);

    const book = new Book(
      component.bookForm.value.title,
      component.bookForm.value.author,
      component.bookForm.value.pages,
      component.bookForm.value.isFav,
      component.bookForm.value.isLoaned,
      component.bookForm.value.isReading
    );

    component.onAddBook();

    expect(bookServiceSpy).toHaveBeenCalledTimes(1);
    expect(bookServiceSpy).toHaveBeenCalledWith(book);
    expect(modalServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should not add book with invalid form', () => {
    const bookServiceSpy = jest.spyOn(booksServiceMock, 'addBook');
    const modalServiceSpy = jest.spyOn(modalServiceMock, 'toggleModal');

    component.bookForm.controls['title'].setValue('');
    component.bookForm.controls['pages'].setValue('');

    component.onAddBook();

    expect(component.bookForm.valid).toBeFalsy();
    expect(bookServiceSpy).not.toHaveBeenCalled();
    expect(modalServiceSpy).not.toHaveBeenCalled();
  });

  it('should call modal service toggle method on cancel', () => {
    const modalServiceSpy = jest.spyOn(modalServiceMock, 'toggleModal');
    component.onCancel();
    expect(modalServiceSpy).toHaveBeenCalledTimes(1);
  });

  it('should not add book when title is only empty string', () => {
    const bookServiceSpy = jest.spyOn(booksServiceMock, 'addBook');
    const modalServiceSpy = jest.spyOn(modalServiceMock, 'toggleModal');

    //Set empty string
    component.bookForm.controls['title'].setValue('    ');

    component.onAddBook();

    expect(component.bookForm.controls['title'].valid).toBeFalsy();
    expect(bookServiceSpy).not.toHaveBeenCalled();
    expect(modalServiceSpy).not.toHaveBeenCalled();
  });
});
