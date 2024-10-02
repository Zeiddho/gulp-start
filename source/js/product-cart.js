import { getStorage, removeFromStorage } from './localstorage.js';
import { openModal } from './modal.js';
import formatPrice from './formatPrice.js';

const modalCart = document.querySelector ('#modal_cart');
const blockMenu = document.querySelector ('.header__shopping-cart');
const cart = blockMenu.querySelector ('.shopping-cart');
const cartList = cart.querySelector ('.shopping-cart__list');
const cartOpenedButton = blockMenu.querySelector ('.header__cart-button');
const cartCount = blockMenu.querySelector ('.header__pin');
const cartProductTemplate = document.querySelector ('#shopping-cart-product').content;

/* проходимся по всем продуктам из стореджа */
export const renderCart = (isClick = false) => {
  const editProductCount = (clone, cart, product, totalPriceEl, operation = 'plus') => {
    const productIndex = uniqueData.findIndex(item => item.id === product.id);
    const input = clone.querySelector ('.shopping-cart__input');
    const cartTotalEl = cart.querySelector ('.shopping-cart__total span');

    if (operation === 'plus') {
      if (productIndex !== -1) {
        uniqueData[productIndex].amount++;
      } else {
        uniqueData.push({ id: product.id, amount: 1});
      };
      localStorage.setItem('cart', JSON.stringify(uniqueData));
      cartTotalEl.textContent = Number(cartTotalEl.textContent) + 1;

    } else {
      uniqueData = JSON.parse(localStorage.getItem('cart'));
      // cartTotalEl.textContent > 0 ? cartTotalEl.textContent = Number(cartTotalEl.textContent) - 1 : 0;/* неправильно работает */
      cartTotalEl.textContent = uniqueData.reduce((total, item) => total + item.amount, 0);
    }
    input.value = uniqueData.find(item => item.id === product.id).amount;
    totalPriceEl.textContent = formatPrice(uniqueData.reduce((total, item) => total + item.price * item.amount, 0));
    // totalPriceEl.textContent = cartTotalEl.textContent * product.price;/* так тоже можно? */
  }

  const data = getStorage('cart');

  if (!data?.length) {
    return;
  }

  let uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse).sort((a, b) => a.id - b.id);

  const fragment = document.createDocumentFragment();
  cartList.innerHTML = '';

  uniqueData.forEach(product => {
    const clone = cartProductTemplate.querySelector('.shopping-cart__item').cloneNode(true);
    clone.dataset.productId = product.id;
    clone.querySelector ('.shopping-cart__input').value = product.amount;
    clone.querySelector ('.shopping-cart__link').href = product.link;
    clone.querySelector ('.shopping-cart__link img').src = product.image;
    clone.querySelector ('.shopping-cart__link p').textContent = product.name;
    clone.querySelector ('.shopping-cart__price').textContent = formatPrice(product.price);

    clone.querySelector ('.shopping-cart__button--minus').addEventListener('click', () => {
      removeFromStorage('cart', product.id);
      editProductCount(clone, cart, product, totalPriceEl, 'minus');
    });

    clone.querySelector ('.shopping-cart__button--plus').addEventListener('click', () => {
      editProductCount(clone, cart, product, totalPriceEl, 'plus');
    });

    fragment.append(clone);
  });

  if(isClick) {
    openModal(modalCart);
  }
  cartList.append(fragment);
  cartCount.textContent = cartList.childElementCount;

  const cartTotalEl = cart.querySelector ('.shopping-cart__total span');
  const totalPriceEl = cart.querySelector('.shopping-cart__sum');

  cartTotalEl.textContent = uniqueData.reduce((total, item) => total + item.amount, 0);
  totalPriceEl.textContent = formatPrice(uniqueData.reduce((total, item) => total + item.price * item.amount, 0));
};

const openCart = (event) => {
  event.preventDefault();

  if(!cartList.childElementCount) {
  return;
  }
  cart.classList.add ('header__cart_active');
}

const closeCart = (event) => {
  if(blockMenu.contains(event.target)) {
      return;
  }
  if(blockMenu.classList.contains('header__cart_active')) {
      event.preventDefault();
  }
  cart.classList.remove('header__cart_active');
}

document.addEventListener('click', closeCart);
cartOpenedButton.addEventListener('click', openCart);

if(getStorage('cart')?.length) {
    renderCart();
}
