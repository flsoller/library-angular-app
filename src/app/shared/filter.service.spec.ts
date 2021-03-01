import { FilterService } from './filter.service';
import { Book } from '../books/book.model';

describe('FilterService', () => {
  let service: FilterService;
  let mockLibrary: Book[];

  beforeEach(() => {
    service = new FilterService();
    mockLibrary = [
      new Book('Some Title 1', 'Some Author 1', 100, true, false, false),
      new Book('Some Title 2', 'Some Author 2', 200, false, true, false),
      new Book('Some Title 3', 'Some Author 3', 300, false, false, true),
    ];
  });

  it('returns full array with all books', () => {
    mockLibrary = service.viewAll(mockLibrary);
    expect(mockLibrary.length).toBe(3);
  });

  it('returns filtered array with book type: isFav', () => {
    mockLibrary = service.viewFavourite(mockLibrary);
    expect(mockLibrary.length).toBe(1);
    expect(mockLibrary[0].isFav).toBe(true);
  });

  it('returns filtered array with book type: isLoaned', () => {
    mockLibrary = service.viewLoaned(mockLibrary);
    expect(mockLibrary.length).toBe(1);
    expect(mockLibrary[0].isLoaned).toBe(true);
  });

  it('returns filtered array with book type: isReading', () => {
    mockLibrary = service.viewIsReading(mockLibrary);
    expect(mockLibrary.length).toBe(1);
    expect(mockLibrary[0].isReading).toBe(true);
  });
});
