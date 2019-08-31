import { LitElement, html, css } from 'lit-element';

import './views/register/register-view.js';

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
        <main>
            <register-view></register-view>
        </main>
    `;
    }
}
customElements.define('app-root', AppRoot);