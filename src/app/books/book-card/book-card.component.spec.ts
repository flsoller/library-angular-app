import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../book.model';

import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardComponent],
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
});
