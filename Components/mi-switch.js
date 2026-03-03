class MiSwitch extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML=`
            <style>
                .switch{
                    width: 48px;
                    height: 24px;
                    background: var(--color-tyrell-70);
                    border-radius: 12px;
                    cursor: pointer;
                    position: relative;
                    transition: background var(--transition-normal);
                }
                .switch:hover
                {
                    background: var(--color-tyrell-60);
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

                /**Change .switch style when checked attribute is selected**/
                :host([checked]) .switch {
                    background: var(--color-tully-60);
                    transition: transform var(--transition-normal);

                }
                /**Change .switch style when checked attribute is selected and hovered**/
               :host([checked]) .switch:hover {
                    background: var(--color-tully-50);
                    transition: transform var(--transition-normal);

                }
                /**Move thumb position**/
                :host([checked]) .thumb {
                    transform: translateX(20px);
                }
                /**Change switch background and cursor**/
                :host([checked][disabled]) .switch {
                    background: var(--color-tully-90);
                    cursor: default;

                }
                /**Change switch background and cursor**/
                :host([disabled]) .switch {
                    background: var(--color-tyrell-80);
                    cursor: default;
                }
                /**Change switch thumb background and cursor**/
                :host([disabled]) .thumb {
                    background: var(--color-stark-50);
                }

            </style>

            <div class="switch">
            <div class="thumb"></div>
            </div>
        `;
    }
    connectedCallback() {
        this.shadowRoot
        .querySelector(".switch")
        .addEventListener("click", () => this.toggle());
    }

    toggle() {
        //isChecked constant
        const isChecked = this.hasAttribute("checked");
        const disabled = this.hasAttribute("disabled");

        //check if the switch is enabled
        if(!disabled)
        {
            //isChecked? Yes=removeAttribute No=setAttribute to check
            if (isChecked) {
                this.removeAttribute("checked");
            } else {
                this.setAttribute("checked", "");
            }
                
            //Anounce changes by dispatchEvent
            this.dispatchEvent(
                //Create a new custom event
                new CustomEvent("change", {
                    detail: { checked: this.hasAttribute("checked") },
                    bubbles: true,
                    composed: true
                })
            );
        }

        
    }
}

customElements.define("mi-switch", MiSwitch);