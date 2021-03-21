import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { ModalService } from 'src/app/shared/modal.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {
  menuSort = false;

  constructor(
    private modalService: ModalService,
    private booksService: BooksService
  ) {}

  onMenuSortToggle() {
    this.menuSort = !this.menuSort;
  }

  onModalOpen() {
    this.modalService.toggleModal();
  }

  onGetAll() {
    this.booksService.getAll();
    this.onMenuSortToggle();
  }

  onGetIsReading() {
    this.booksService.getIsReading();
    this.onMenuSortToggle();
  }

  onGetIsFav() {
    this.booksService.getIsFav();
    this.onMenuSortToggle();
  }

  onGetIsLoaned() {
    this.booksService.getIsLoaned();
    this.onMenuSortToggle();
  }
}
