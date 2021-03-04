import { Component } from '@angular/core';
import { ModalService } from 'src/app/shared/modal.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
})
export class MenuBarComponent {
  constructor(private modalService: ModalService) {}

  onModalOpen() {
    this.modalService.toggleModal();
  }
}
