const buttonOpened = document.querySelector(".header__burger");
const menu = document.querySelector('.header__nav');
const buttonClosed = document.querySelector('.header__close')

buttonOpened.addEventListener('click', () => {
  menu.classList.add('header__nav--showed');
  buttonClosed.addEventListener('click', closeMenu);
});

const closeMenu = () => {
  menu.classList.remove('header__nav--showed');
  buttonClosed.removeEventListener('click', closeMenu);
};
