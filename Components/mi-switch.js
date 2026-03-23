class MiSwitch extends HTMLElement {
  static get observedAttributes() {
    return ["checked", "disabled"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // Renderizamos una sola vez al construir para establecer la estructura
    this.render(); 
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          outline: none;
        }
        /* Bloqueo físico de clics si está disabled */
        :host([disabled]) {
          pointer-events: none;
          opacity: 0.6;
        }
        .switch {
          width: 44px; /* Ajustado para que el thumb de 20px quepa bien */
          height: 24px;
          background: var(--color-tyrell-70);
          border-radius: 12px;
          cursor: pointer;
          position: relative;
          transition: background var(--transition-normal);
        }
        .thumb {
          width: 20px;
          height: 20px;
          background: var(--color-snow-50);
          border-radius: 50%;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform var(--transition-normal);
        }
        :host([checked]) .switch { background: var(--color-tully-60); }
        :host([checked]) .thumb { transform: translateX(20px); }

      </style>

      <div class="switch" role="presentation">
        <div class="thumb"></div>
      </div>
    `;
  }

  connectedCallback() {
    // Configuramos accesibilidad inicial
    if (!this.hasAttribute('role')) this.setAttribute('role', 'switch');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
    
    this.shadowRoot.querySelector(".switch").addEventListener("click", () => this.toggle());
    
    // Soporte para teclado (Espacio y Enter)
    this.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggle();
      }
    });
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'checked') {
      this.setAttribute('aria-checked', this.hasAttribute('checked'));
    }
    if (name === 'disabled') {
      this.setAttribute('aria-disabled', this.hasAttribute('disabled'));
      this.setAttribute('tabindex', this.hasAttribute('disabled') ? '-index' : '0');
    }
  }

  toggle() {
    if (this.hasAttribute("disabled")) return;

    const isChecked = this.hasAttribute("checked");
    
    // Cambiamos el atributo (esto disparará el attributeChangedCallback si es necesario)
    if (isChecked) {
      this.removeAttribute("checked");
    } else {
      this.setAttribute("checked", "");
    }

    this.dispatchEvent(new CustomEvent("change", {
      detail: { checked: !isChecked },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define("mi-switch", MiSwitch);