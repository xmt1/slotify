import { LitElement, html, css } from 'lit-element';

class App404 extends LitElement {
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
customElements.define('app-404', App404);