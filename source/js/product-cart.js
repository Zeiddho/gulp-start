import { getStorage, addToStorage, removeFromStorage } from './localstorage.js';
import { openModal } from './modal.js';

const modalCart = document.querySelector ('#modal_cart');
const blockMenu = document.querySelector ('.header__shopping-cart');
const cart = blockMenu.querySelector ('.shopping-cart');
const cartList = cart.querySelector ('.shopping-cart__list');
const cartOpenedButton = blockMenu.querySelector ('.header__cart-button');
const cartCount = blockMenu.querySelector ('.header__pin');
const cartProductTemplate = document.querySelector ('#shopping-cart-product').content;

/* проходимся по всем продуктам из стореджа */
export const renderCart = (isClick = false) => {

  const data = getStorage('cart');
  if (!data?.length) {
    return;
  }

  const countsData = data.reduce((acc, curr) => {
    const id = curr.id;

    if(acc[id]) {
      acc[id]++;
    } else {
      acc[id] = 1;
    }
    return acc;
  }, {});

  const uniqueData = [...new Set(data.map(JSON.stringify))].map(JSON.parse).sort((a, b) => a.id - b.id);

  const fragment = document.createDocumentFragment();
  cartList.innerHTML = '';

  uniqueData.forEach(product => {
    const clone = cartProductTemplate.querySelector('.shopping-cart__item').cloneNode(true);
    clone.dataset.productId = product.id;
    clone.querySelector ('.shopping-cart__input').value = countsData[product.id];
    clone.querySelector ('.shopping-cart__link').href = product.link;
    clone.querySelector ('.shopping-cart__link img').src = product.image;
    clone.querySelector ('.shopping-cart__link p').textContent = product.name;
    clone.querySelector ('.shopping-cart__price').textContent = `${product.price} ₽`;

    clone.querySelector ('.shopping-cart__button--minus').addEventListener('click', () => {
      removeFromStorage('cart', product.id);
      const input = clone.querySelector ('.shopping-cart__input').value;
      const cartTotal = cart.querySelector ('.shopping-cart__total span');

      clone.querySelector ('.shopping-cart__input').value = Number(input) - 1;
      cartTotal.textContent = Number(cartTotal.textContent) - 1;
    });

    clone.querySelector ('.shopping-cart__button--plus').addEventListener('click', () => {
      addToStorage('cart', product.id);
      const input = clone.querySelector ('.shopping-cart__input').value;
      const cartTotal = cart.querySelector ('.shopping-cart__total span');

      clone.querySelector ('.shopping-cart__input').value = Number(input) + 1;
      cartTotal.textContent = Number(cartTotal.textContent) + 1;
    });

    fragment.append(clone);
  });

  if(isClick) {
    openModal(modalCart);
  }
  cartList.append(fragment);
  cartCount.textContent = cartList.childElementCount;

  const cartTotal = cart.querySelector ('.shopping-cart__total');
  cartTotal.textContent = data.length;
  console.log(data.map(item => item.price));
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
    getStorage('cart').forEach(product => {
      renderCart(product);
    });
    cartCount.classList = cartList.childElementCount;
}


