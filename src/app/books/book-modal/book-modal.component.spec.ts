import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksService } from 'src/app/shared/books.service';

import { BookModalComponent } from './book-modal.component';

describe('BookModalComponent', () => {
  let component: BookModalComponent;
  let fixture: ComponentFixture<BookModalComponent>;
  let debugEl: DebugElement;
  let service: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookModalComponent],
      providers: [BooksService],
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

  // it('should call books service addBook method', () => {
  //   spyOn(service, 'addBook').and.callThrough();
  //   component.onAddBook();
  //   expect(service.addBook).toHaveBeenCalled();
  // });
});
