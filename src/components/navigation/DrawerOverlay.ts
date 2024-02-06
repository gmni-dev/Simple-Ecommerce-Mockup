let overlayOpacity: number;
const overlayOpacityEnabledValue = 0.8;
const overlayOpacityDisabledValue = 0;

const TPL_DrawerOverlay = document.createElement('template');

const TPL_DrawerOverlay_css = /* CSS */ `
<style>
    :host {
      z-index: 1000;
    }

    .overlay {
      position: fixed;
      left: 0;
      bottom: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      width: 100vw;
      height: 100vh;

      background-color: var(--color-surface-900);
      backdrop-filter: blur(12px);

      opacity: 0.8;
    }
</style>
`;

TPL_DrawerOverlay.innerHTML = /* HTML */ `
  ${TPL_DrawerOverlay_css}

  <div class="overlay"></div>
`;

class DrawerOverlay extends HTMLElement {
  private _overlay: HTMLElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const clone = TPL_DrawerOverlay.content.cloneNode(true);
    shadow.append(clone);

    this._overlay = shadow.querySelector('.overlay')!;
  }

  connectedCallback() {
    this.enableOverlay();
    this._overlay.addEventListener('click', () => {
      this.disableOverlay();
    });
  }

  enableOverlay() {
    this._overlay.style.opacity = String(overlayOpacityEnabledValue);
    this._overlay.style.pointerEvents = 'auto';
    document.querySelector('body')!.style.overflow = 'hidden';
  }

  disableOverlay() {
    this._overlay.style.opacity = String(overlayOpacityDisabledValue);
    this._overlay.style.pointerEvents = 'none';
    document.querySelector('body')!.style.overflow = 'auto';
  }
}

window.customElements.define('drawer-overlay', DrawerOverlay);

export default DrawerOverlay;
