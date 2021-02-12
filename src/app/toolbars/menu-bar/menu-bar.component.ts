import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {
  @Output() openModalRequest = new EventEmitter<boolean>();

  modalOpenStatus = false;

  constructor() {}

  requestOpenModal() {
    this.modalOpenStatus = !this.modalOpenStatus;
    this.openModalRequest.emit(this.modalOpenStatus);
  }
}
