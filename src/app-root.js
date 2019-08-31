import { LitElement, html, css } from 'lit-element';

class AppRoot extends LitElement {
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
        <h1>${this.componentName} works!</h1>
    `;
    }
}
customElements.define('app-root', AppRoot);