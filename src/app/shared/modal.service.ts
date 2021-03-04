import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  modalVisChanged = new EventEmitter<boolean>();

  modalVis: boolean = false;

  getModalState() {
    return this.modalVis;
  }

  toggleModal() {
    this.modalVis = !this.modalVis;
    this.modalVisChanged.emit(this.modalVis);
  }
}
