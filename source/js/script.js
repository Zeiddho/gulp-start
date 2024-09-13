import { closeMenu } from './menu.js';
import { getServerData } from './api.js';
import renderProducts from './renderProducts.js';
import './product-cart.js'
closeMenu ();

const catalogList = document.querySelector('.best-selling__products');
const catalogItemTemplate = document.querySelector('#product').content;
const dataProducts = getServerData('https://zsa-studio.ru/catalog.php');

dataProducts.then((products) => renderProducts(products, catalogItemTemplate, catalogList, true));
