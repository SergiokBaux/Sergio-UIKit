class MiBoton extends HTMLElement {

  constructor() {
    super();
//Crea un Shadow DOM privado para el componente, (evita que los estilos se mezclen con el resto de la página).
    const shadow = this.attachShadow({ mode: "open" });
//si existe atributo → usalo si no existe → usa "Click"
    const text = this.getAttribute("text");
    const type = this.getAttribute("type") || "Primary";

    shadow.innerHTML = `
      <style>
        button
        {
          width: auto;
          height: 36px;
          display: inline-flex;
          align-items: center;
          gap: 8px;


          padding: 8px 16px;
          border-radius: 4px;
          border: none;
          cursor: pointer;

          font-family: var(--font-family-primary);
          font-size: var(--font-size-label);
          font-weight: var(--font-weight-semibold);
          line-height: var( --line-height-label)
        }

        .Primary {
          background: var(--color-tully-60);
          color: var(--color-snow-50);

          transition: all var(--transition-normal);
        }
        .Primary:hover
        {
          background: var(--color-tyrell-50);
          color: var(--color-greyjoy-50);

          transition: all var(--transition-normal);
        }
        .Primary:active
        {
          background: var(--color-tyrell-60);
          color: var(--color-greyjoy-50);

          transition: transform var(--transition-normal);

        }
        .Primary-disabled {
          background: var(--color-tully-80);
          color: var(--color-arryn-20);
        }

        .Secondary {
          color: var(--color-tully-40);
          border: 2px solid var(--color-tully-40);
          box-sizing: border-box;
          background: none;

          transition: all var(--transition-normal);

        }
        .Secondary:hover
        {
          background: var(--color-tully-90);
          transition: all var(--transition-normal);
        }
        .Secondary:active
        {
          background: var(--color-tully-80);
          transition: transform var(--transition-normal);

        }
       .Secondary-disabled {
          border: 2px solid var(--color-stark-60);
          color: var(--color-stark-60);
        }

        .Tertiary
        {
          background: transparent;
          color: var(--color-tyrell-60);

          transition: all var(--transition-normal);

        }
        .Tertiary:hover
        {
          background: transparent;
          color: var(--color-tyrell-50);

          transition: all var(--transition-normal);
        }

        .Tertiary:active
        {
          background: transparent;
          color: var(--color-tyrell-60);

          transition: all var(--transition-normal);
        }
       .Tertiary-disabled
       {
          background: transparent;
          color: var(--color-tyrell-70);
        }
        /****/
        .icon
        {
          display: flex;
          align-items: center;
        }
       ::slotted(svg)
       {
          width: 20px;
          height: 20px;
        }
          
        
      </style>

      <button class="${type}">
          <span class="icon">
            <slot name="icon"></slot>
          </span>
      ${text}
      </button>
    `;


    // Busca el boton dentro del shadow DOM y guardalo en la variable button
    const button = shadow.querySelector("button");

    button.addEventListener("click", () => {
      this.dispatchEvent(new Event("click", { bubbles: true, composed: true }));
    });
  }
}

customElements.define("mi-boton", MiBoton);