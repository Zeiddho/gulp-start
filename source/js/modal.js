export class Modal {
  static modals = document.querySelectorAll('.modal');
  static #activeClass = 'modal--hidden';

  constructor (id, activeClass) {
    this.modal = document.querySelector(id);
    this.modalClose = this.modal.querySelectorAll('.modal__close');
    this.modalContinue = this.modal.querySelectorAll('.modal__go-on');
    this.activeClass = activeClass;
  }

  static closeModal () {
    Modal.modals.forEach(modal => {
      if (modal.classList.contains(Modal.#activeClass)) {
          return
      }
      modal.classList.add(Modal.#activeClass);
    })
};

  openModal () {
    this.modal.classList.toggle(this.activeClass);
    this.modalClose.forEach(modal => modal.addEventListener('click', Modal.closeModal));
    this.modalContinue.forEach(modal => modal.addEventListener('click', Modal.closeModal));
  }
}
