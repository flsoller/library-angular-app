import { StorageService } from './storage.service';

describe('Storage Service', () => {
  let service: StorageService;

  beforeEach(() => {
    service = new StorageService();
  });

  it('Gets from local storage with key', () => {
    let getPersisted = jest.spyOn(window.localStorage.__proto__, 'getItem');

    service.getFromLocalStorage();

    expect(getPersisted).toHaveBeenCalledWith('angular-library');
  });

  it('Sets library to localStorage with key and value', () => {
    let setPersisted = jest.spyOn(window.localStorage.__proto__, 'setItem');
    let mockLibrary = [];

    service.saveToLocalStorage(mockLibrary);

    expect(setPersisted).toHaveBeenCalledWith(
      'angular-library',
      JSON.stringify(mockLibrary)
    );
  });
});
