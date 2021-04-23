import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Book } from '../book.model';
import { BookCardComponent } from './book-card.component';
import { BooksService } from 'src/app/shared/books.service';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  const booksServiceMock = {
    removeBook: jest.fn().mockImplementation(() => of({})),
    updateBook: jest.fn().mockImplementation(() => of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent],
      providers: [{ provide: BooksService, useValue: booksServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    component.book = new Book(
      'Some Title 4',
      'Some Author 4',
      400,
      false,
      false,
      false
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onDelteBook', () => {
    spyOn(component, 'onDeleteBook');
    component.onDeleteBook(component.book.title);
    expect(component.onDeleteBook).toHaveBeenCalledWith(component.book.title);
  });

  it('should call booksService delete method', () => {
    const serviceSpy = jest.spyOn(booksServiceMock, 'removeBook');
    component.onDeleteBook(component.book.title);
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(component.book.title);
  });

  it('should set component to edit mode', () => {
    component.isEdit = false;
    component.onEditBook();

    expect(component.isEdit).toBe(true);
  });

  it('should call booksService update method when in edit mode', () => {
    const serviceSpy = jest.spyOn(booksServiceMock, 'updateBook');
    component.isEdit = true;
    component.onEditBook();

    expect(serviceSpy).toBeCalledWith(
      component.book.title,
      component.book.isFav,
      component.book.isLoaned,
      component.book.isReading
    );

    expect(component.isEdit).toBe(false);
  });
});
