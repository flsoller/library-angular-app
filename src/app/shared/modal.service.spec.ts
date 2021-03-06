import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;
  let modalVis: boolean;

  beforeEach(() => {
    service = new ModalService();
  });

  it('returns initial status false', () => {
    modalVis = service.getModalState();
    expect(modalVis).toBe(false);
  });

  it('toogles the modal staus and emits it', () => {
    const spy = jest.spyOn(service.modalVisChanged, 'emit');

    service.toggleModal();
    modalVis = service.getModalState();

    expect(modalVis).toBe(true);
    expect(spy).toHaveBeenCalledWith(modalVis);
  });
});
