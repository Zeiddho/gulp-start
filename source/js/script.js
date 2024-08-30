import { closeMenu } from './menu.js';
closeMenu ();

import renderProducts from './renderProducts.js';

const catalogList = document.querySelector('.best-selling__products');
const catalogItemTemplate = document.querySelector('#product').content;


import { fetchProducts } from './fetchProducts.js';
const dataProducts = fetchProducts('https://zsa-studio.ru/catalog.php');

dataProducts.then((products) => renderProducts(products, catalogItemTemplate, catalogList, true));
