export const openModal = (modal) => {
  const modalCloseButtons = modal.querySelectorAll('.modal__go-on, .modal__close');
  modal.classList.remove('modal--hidden');

  modalCloseButtons.forEach(modalCloseButton => {
    modalCloseButton.addEventListener('click', () => {
      closeModal(modal);
    });
  });
};

export const closeModal = (modal) => {
  modal.classList.add('modal--hidden');
}
