const buttonOpened = document.querySelector(".header__burger");
const menu = document.querySelector('.header__nav');
const buttonClosed = document.querySelector('.header__close');

export const closeMenu = () => {
  menu.classList.remove('header__nav--showed');
  buttonClosed.removeEventListener('click', closeMenu);
};

if (buttonOpened && menu) {
  buttonOpened.addEventListener('click', () => {
    menu.classList.add('header__nav--showed');

    if (buttonClosed) {
      buttonClosed.addEventListener('click', closeMenu);
    }
  });
}

