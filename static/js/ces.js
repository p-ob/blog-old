const template = document.createElement("template");
template.innerHTML = `
    <style>
      :host {
        display: inline-block;
        margin: 0 auto;
        box-shadow: 0 0 10px rgba(128, 100, 38, 0.34);
        border-radius: 8px;
        border: 2px dashed hotpink;
      }

      span {
          color: black;
          font-family: "Comic Sans MS", cursive, sans-serif;
      }
    </style>

    <span>Hello, world!</span>
    <slot></slot>

`;

class FooBarElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("foo-bar1", FooBarElement);

const template2 = document.createElement("template");
template2.innerHTML =
  '<style>:host{display:inline-block;margin:0 auto;box-shadow:0 0 10px rgba(128,100,38,.34);border-radius:8px;border:2px dashed;border-color:hotpink}span{color:black;font-family:var(--foo-bar-span-font,"Comic Sans MS",cursive,sans-serif)}::slotted(p){background-color:purple;color:white!important}</style><span>Hello,world!</span><slot></slot>';

class FooBar2Element extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template3.content.cloneNode(true));
  }
}

customElements.define("foo-bar2", FooBar2Element);

const template3 = document.createElement("template");
template3.innerHTML =
  '<style>:host {display: inline-block;margin: 0 auto;box-shadow: 0 0 10px rgba(128, 100, 38, 0.34);border-radius: 8px;border: 2px dashed;border-color: hotpink;}span {color: black;font-family: var(--foo-bar-span-font, "Comic Sans MS", cursive, sans-serif);}::slotted(p) {background-color: purple;color: white !important;}</style><span>Hello, world!</span><slot></slot>';

class FooBar3Element extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template3.content.cloneNode(true));
  }
}

customElements.define("foo-bar3", FooBar3Element);
