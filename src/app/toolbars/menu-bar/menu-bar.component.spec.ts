import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BooksService } from 'src/app/shared/books.service';
import { ModalService } from 'src/app/shared/modal.service';

import { MenuBarComponent } from './menu-bar.component';

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;
  let serviceSpy: jest.SpyInstance;
  let dropdownSpy: jest.SpyInstance;

  const booksServiceMock = {
    getAll: jest.fn().mockImplementation(() => of({})),
    getIsReading: jest.fn().mockImplementation(() => of({})),
    getIsFav: jest.fn().mockImplementation(() => of({})),
    getIsLoaned: jest.fn().mockImplementation(() => of({})),
  };

  const modalServiceMock = {
    toggleModal: jest.fn().mockImplementation(() => of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuBarComponent],
      providers: [
        { provide: BooksService, useValue: booksServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dropdownSpy = jest.spyOn(component, 'onMenuSortToggle');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call modal service toggle method', () => {
    const modalSpy = jest.spyOn(modalServiceMock, 'toggleModal');

    component.onModalOpen();

    expect(modalSpy).toHaveBeenCalled();
  });

  it('should call booksService method', () => {
    serviceSpy = jest.spyOn(booksServiceMock, 'getAll');

    component.onGetAll();

    expect(serviceSpy).toHaveBeenCalled();
    expect(dropdownSpy).toHaveBeenCalledTimes(1);
    serviceSpy.mockRestore();
  });

  it('should call booksService method', () => {
    serviceSpy = jest.spyOn(booksServiceMock, 'getIsReading');

    component.onGetIsReading();

    expect(serviceSpy).toHaveBeenCalled();
    expect(dropdownSpy).toHaveBeenCalledTimes(1);
    serviceSpy.mockRestore();
  });

  it('should call booksService method', () => {
    serviceSpy = jest.spyOn(booksServiceMock, 'getIsFav');

    component.onGetIsFav();

    expect(serviceSpy).toHaveBeenCalled();
    expect(dropdownSpy).toHaveBeenCalledTimes(1);
    serviceSpy.mockRestore();
  });

  it('should call booksService method', () => {
    serviceSpy = jest.spyOn(booksServiceMock, 'getIsLoaned');

    component.onGetIsLoaned();

    expect(serviceSpy).toHaveBeenCalled();
    expect(dropdownSpy).toHaveBeenCalledTimes(1);

    serviceSpy.mockRestore();
  });

  it('should toggle dropdown menu', () => {
    component.menuSort = false;
    component.onMenuSortToggle();

    expect(dropdownSpy).toHaveBeenCalledTimes(1);
    expect(component.menuSort).toBeTruthy();
  });
});
