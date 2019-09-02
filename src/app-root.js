import { LitElement, html, css } from 'lit-element';
import { installRouter } from 'pwa-helpers/router.js';

class AppRoot extends LitElement {
    static get properties() {
        return {
            _page: { type: String }
        };
    }

    static get styles() {
        return css`
        :host {
            display: block;
        }

        main {
            display: block;
        }

        .page {
            display: none;
        }

        .page[active] {
            display: block;
        }
    `;
    }


    render() {
        return html`
        <main>
            <register-view class="page" ?active="${this._page === 'register'}"></register-view>
            <login-view class="page" ?active="${this._page === 'login'}"></login-view>
            <app-404 class="page" ?active="${this._page === '404'}"></app-404>
        </main>
    `;
    }

    constructor() {
        super();
    }

    firstUpdated() {
        installRouter((location) => this._locationChanged(location));
    }

    _locationChanged(location) {
        const path = window.decodeURIComponent(location.pathname);
        const page = path === '/' ? 'register' : path.slice(1);
        this._loadPage(page);
    }

    _loadPage(page) {
        switch (page) {
            case 'register':
                import('./views/register/register-view.js').then((module) => {
                    // Put code in here that you want to run every time you navigate
                    // to this view
                });
                break;
            case 'login':
                import('./views/register/login-view.js').then((module) => {
                    // Put code in here that you want to run every time you navigate
                    // to this view
                });
                break;
            default:
                page = '404';
                import('./views/404/app-404.js');
                // Redirect after two seconds
                setTimeout(() => { location.href = '/' }, 3000)
        }

        this._page = page;
    }

}
customElements.define('app-root', AppRoot);