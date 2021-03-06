import { Component } from '@angular/core';
import { BooksService } from 'src/app/shared/books.service';
import { ModalService } from 'src/app/shared/modal.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {
  constructor(
    private modalService: ModalService,
    private booksService: BooksService
  ) {}

  onModalOpen() {
    this.modalService.toggleModal();
  }

  onGetAll() {
    this.booksService.getAll();
  }

  onGetIsReading() {
    this.booksService.getIsReading();
  }

  onGetIsFav() {
    this.booksService.getIsFav();
  }

  onGetIsLoaned() {
    this.booksService.getIsLoaned();
  }
}
