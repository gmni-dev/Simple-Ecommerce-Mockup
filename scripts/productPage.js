import { findItem, formatCurrency } from './utilities.js';
('use strict');

const productTitleElement = document.querySelector('.product-title');
const productBrandElement = document.querySelector('.product-brand');
const productDescriptionElement = document.querySelector(
  '.product-description'
);
const productSizeElement = document.querySelector('.product-size');
const productStyleElement = document.querySelector('.product-style');
const productPriceElement = document.querySelector('.product-price');
const productImageElement = document.querySelector('.product-image');

const baseUrl = '';

let products = new Array();

async function catchProductList() {
  const response = await fetch(`${baseUrl}/data/products.json`);
  const productsObj = await response.json();
  products = [...productsObj];
}

async function initializePage() {
  await catchProductList();

  const productId = new URLSearchParams(window.location.search).get(
    'productId'
  );

  const optionId = new URLSearchParams(window.location.search).get('optionId');
  console.log('Option ID: ' + optionId);

  const product = products.find((i) => i.productId == productId);

  const productOption = product.options.find((i) => i.optionId == optionId);

  productTitleElement.innerText = product.title;
  productBrandElement.innerText = product.brand;
  productDescriptionElement.innerText = product.description;
  productSizeElement.innerText = productOption.optionSize;
  productStyleElement.innerText = productOption.optionStyle;
  productPriceElement.innerText = productOption.price;
  productImageElement.src = `${baseUrl}/assets/images/productImages/small/${productOption.imageName}_small.webp`;
}

document.addEventListener('DOMContentLoaded', initializePage);
