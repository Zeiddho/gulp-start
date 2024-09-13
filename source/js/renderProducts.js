import { renderCart } from './product-cart.js';
export default (products, template, target, isTargetList = false) => {
  const fragment = document.createDocumentFragment();

  let productEl = template.querySelector('.product');

  if(isTargetList) {
    const node = document.createElement('li');
    node.innerHTML = productEl.innerHTML;

    Array.prototype.forEach.call(productEl.attributes, function( attr ){
      node.setAttribute( attr.name, attr.value );
    });

    productEl = node;
  }

  products.forEach(product => {
    const itemEl = productEl.cloneNode(true);
    const imageEl = itemEl.querySelector('.product__photo');
    const nameEl = itemEl.querySelector('.product__name');
    const priceEl = itemEl.querySelector('.product__new-price');
    const oldPriceEl = itemEl.querySelector('.product__old-price');
    const { id, status, isBig, image, name, price, oldPrice } = product;
    const buttonEl = itemEl.querySelector('.product__button');

    buttonEl.addEventListener('click', () => {
      renderCart(product, true);
    });

    itemEl.dataset.productId = id;
    imageEl.src = image;
    nameEl.textContent = name;
    priceEl.textContent = `${price} ₽`;
    oldPriceEl.textContent = `${oldPrice} ₽`;

    if(isBig) {
      itemEl.classList.add(`product--${isBig ? 'big' : ''}`);
    }

    if(status?.length) {
      itemEl.classList.add(`product--${status}`);
    }

    fragment.appendChild(itemEl);
  })

  target.innerHTML = '';
  target.appendChild(fragment);
}
