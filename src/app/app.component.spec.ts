import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Book } from './books/book.model';
import { BooksService } from './shared/books.service';
import { ModalService } from './shared/modal.service';

describe('AppComponent', () => {
  const mockBook = new Book(
    'I like testing',
    'Important Author',
    100,
    false,
    false,
    false
  );

  const mockEmitBook = new Book(
    'I like testing even more',
    'More Important Author',
    200,
    true,
    true,
    false
  );

  const booksServiceMock = {
    getBooks: jest.fn().mockImplementation(() => [mockBook]),
    libraryChanged: new EventEmitter<Book[]>(),
  };

  const modalServiceMock = {
    getModalState: jest.fn().mockImplementation(() => true),
    modalVisChanged: new EventEmitter<boolean>(),
  };

  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: BooksService, useValue: booksServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call booksService and set books to response', () => {
    expect(app.books).toStrictEqual([mockBook]);

    booksServiceMock.libraryChanged.emit([mockEmitBook]);
    expect(app.books).toStrictEqual([mockEmitBook]);
  });

  it('should call modalService and set showModal to response', () => {
    expect(app.showModal).toBe(true);

    modalServiceMock.modalVisChanged.emit(false);
    expect(app.showModal).toBe(false);
  });
});
