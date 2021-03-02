import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from '../book.model';

import { BookModalComponent } from './book-modal.component';

describe('BookModalComponent', () => {
  let component: BookModalComponent;
  let fixture: ComponentFixture<BookModalComponent>;
  let debugEl: DebugElement;

  const booksServiceMock = {
    addBook: jest.fn().mockImplementation(() => of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookModalComponent],
      providers: [{ provide: BooksService, useValue: booksServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookModalComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onAddBook method', () => {
    spyOn(component, 'onAddBook');
    component.onAddBook();
    expect(component.onAddBook).toHaveBeenCalled();
  });

  it('should call books service addBook method', () => {
    const serviceSpy = jest.spyOn(booksServiceMock, 'addBook');
    const book = new Book(
      (component.titleInputRef.nativeElement.value = 'Title'),
      (component.authorInputRef.nativeElement.value = 'Author'),
      (component.pagesInputRef.nativeElement.value = 100),
      (component.isFavInputRef.nativeElement.checked = true),
      (component.isLoanedInputRef.nativeElement.checked = false),
      (component.isReadingInputRef.nativeElement.checked = true)
    );

    component.onAddBook();

    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(book);
  });
});
