import { LitElement, html, css } from 'lit-element';

class NewComponent extends LitElement {
    static get properties() {
        return {
            componentName: { type: String }
        };
    }

    static get styles() {
        return css`
        :host {
            display: block;
        }`;
    }

    constructor() {
        super();
    }

    firstUpdated() {
        this.componentName = this.tagName;
    }

    render() {
        return html`
        <p>${this.componentName} works!</p>
    `;
    }
}
customElements.define('new-component', NewComponent);