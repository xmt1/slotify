import { LitElement, html, css } from 'lit-element';

class App404 extends LitElement {
    static get properties() {
        return {
            
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

    }

    render() {
        return html`
        <p>404 - Page does not exist</p>
        <p>This page will redirect in a few seconds or <a href="/">redirect now</a></p>
    `;
    }
}
customElements.define('app-404', App404);