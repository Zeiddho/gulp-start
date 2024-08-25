import { closeMenu } from './menu.js';
closeMenu ();

import products from './products.js';
import renderProducts from './renderProducts.js';

const catalogList = document.querySelector('.best-selling__products');
const catalogItemTemplate = document.querySelector('#product').content;

renderProducts(products, catalogItemTemplate, catalogList, true);
