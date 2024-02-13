import { Product } from '../../models/product';
import { Cart } from '../../utils/core/cartManager';
import { Catalog } from '../../utils/core/catalogManager';
import CartCard from './CartCard';

const TPL_CartMenu = document.createElement('template');

const TPL_CartMenu_css = /* CSS */ `
<style>
    .container {
        display: flex;
        flex-direction: column;

        gap: 1rem;

        border: 2px solid var(--color-secondary-700);
        border-radius: 5pt;

        padding: 0.6rem;
        margin: 0.6rem;
    }
</style>
`;

TPL_CartMenu.innerHTML = /* HTML */ `
  ${TPL_CartMenu_css}

  <div class="container"></div>
`;

export default class CartMenu extends HTMLElement {
  private _container: HTMLElement;
  private _cartItems: { [key: string]: Product } = {};

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_CartMenu.content.cloneNode(true);
    shadow.append(clone);
    this._container = shadow.querySelector('.container')!;
  }

  connectedCallback() {
    this.updateCartItems();

    window.addEventListener('addToCart', (event: Event) => {
      if (event instanceof CustomEvent) this.handleAddToCart(event);
    });
  }

  appendToCart(value: HTMLElement) {
    this._container.append(value);
  }

  handleAddToCart(event: CustomEvent<{ productId: string }>) {
    const { productId } = event.detail;
    const productToAdd = Catalog.getItem(productId);
    const cartCard = new CartCard(productToAdd);
    this.appendToCart(cartCard);
  }

  updateCartItems() {
    this._cartItems = Cart.getAllItems();

    for (const key in this._cartItems) {
      const cartCard = new CartCard(Cart.getItem(key));
      this._container.append(cartCard);
    }
  }
}

window.customElements.define('cart-menu', CartMenu);
