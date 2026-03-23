class MiTextbox extends HTMLElement
{
    constructor(){
        super();
        this.attachShadow({mode: "open"});

        const placeholder = this.getAttribute("placeholder") || "Type text here";
        this.shadowRoot.innerHTML=`
        <style>
        :host{
            display: inline-block;
        }
        input {
          width: 100%;
          height: 80%;

          padding: 0px;
          border: none;

          background: var(--color-snow-40);
          color: var(--color-greyjoy-60);

          font-family: var(--font-family-primary);
          font-size: var(--font-size-paragraph);

          outline: none;

          transition: all var(--transition-normal);
        }
        .input {
          display: flex;
          align-items: center;
          width: 280px;
          height: 48px;

          padding: 0 16px;

          border-radius: 4px;
          border: 2px solid var(--color-stark-60);

          background: var(--color-snow-40);
          color: var(--color-greyjoy-60);

          font-family: var(--font-family-primary);
          font-size: var(--font-size-paragraph);

          outline: none;

          transition: all var(--transition-normal);
        }

        .input::placeholder {
            color: var(--color-snow-80);

            transition: all var(--transition-normal);
        }

        .input:focus {
          border: 2px solid var(--color-tully-60);

          transition: all var(--transition-normal);

        }

        .input:hover {
          border-color: var(--color-tully-50);

          transition: all var(--transition-normal);

        }

        .input:disabled {
          opacity: 0.5;
          cursor: not-allowed;

          transition: all var(--transition-normal);

        }
        .icon
        {
          display: flex;
          align-items: center;
        }
       ::slotted(svg)
       {
          width: 20px;
          height: 20px;
          color: var(--color-snow-60);
        }

            </style>

            <span class="input">
              <input type="text" placeholder="${placeholder}">
              <span class="icon">
                <slot name="icon"></slot>
              </span>
            </span>
        `;
    }

    get value() {
        return this.shadowRoot.querySelector("input").value;
    }
}

customElements.define("mi-textbox", MiTextbox);