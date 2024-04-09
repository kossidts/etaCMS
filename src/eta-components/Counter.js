export default class Counter extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.count = 0;
    }
    // tagName = ""
    // className = ""
    // localName = ""
    // nodeName = ""
    componentName = "eta-alert";

    increment() {
        this.count++;
        // emit count event
    }

    connectedCallback() {
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });
        console.log("Custom element added to page.");
        // Too late to add children?
        // <div>The current count is ${state.count}</div>
        // <button on-click('increment')>Click me!</button>
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Attribute ${name} has changed.`);
    }
}

//  customElements.define("eta-alert", Alert);
