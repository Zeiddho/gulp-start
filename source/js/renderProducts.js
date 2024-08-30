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
      const linkEl = itemEl.querySelector('.product__link');
      const imageEl = itemEl.querySelector('.product__photo');
      const nameEl = itemEl.querySelector('.product__name');
      const priceEl = itemEl.querySelector('.product__new-price');
      const oldPriceEl = itemEl.querySelector('.product__old-price')
      const { id, status, isBig, image, name, price, oldPrice } = product;

      itemEl.dataset.productId = id;
      imageEl.src = image;
      nameEl.textContent = name;
      priceEl.textContent = `${price} ₽`;
      oldPriceEl.textContent = `${oldPrice} ₽`;
      // linkEl.href = link;

      // if(isBig) {
      //   itemEl.classList.add(`product--${big}`);
      // } /* не работает */

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

