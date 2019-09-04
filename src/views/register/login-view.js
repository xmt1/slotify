import { LitElement, html, css } from 'lit-element';

class LoginView extends LitElement {
    static get properties() {
        return {
            formErrors: { type: Array } // populated from the backend response
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
    
    render() {
        return html`
        <div id="inputContainer">
            <form 
                action="#" 
                id="loginForm" 
                method="POST" 
                @submit="${this.onLogin}">
                <h2>Login to your account</h2>
                ${this.formErrors ? this.getError("loginFailed") : ''}
                <div>
                    <label for="loginUsername">Username</label>
                    <input
                        required 
                        type="text"
                        placeholder="e.g. bart simpson" 
                        id="loginUsername" 
                        name="loginUsername">
                </div>
                <div>
                    <label for="loginPassword">Password</label>
                    <input
                        required 
                        type="password"
                        id="loginPassword" 
                        name="loginPassword">
                </div>
                <button type="submit" name="loginButton">LOG IN</button>
            </form>
        </div>
    `;
    }

    onLogin(e) {
        e.preventDefault();
        const loginUsername = this.shadowRoot.querySelector('#loginUsername');
        const loginPassword = this.shadowRoot.querySelector('#loginPassword');
        const user = {
            username: loginUsername.value,
            password: loginPassword.value
        }
        this.postData('http://localhost/slotify/login.php', user)
            .then(data => {
                if (!data.success) {
                    console.log(data, 'validation failed');
                    this.formErrors = data.errors;
                } else {
                    console.log(data, 'validation passed');
                    this.updateRoute();
                    this.resetForm();
                }
                
            })
            .catch(err => console.log(err));
    }

    postData(url = '', data = {}) {
        return fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json();
        })
        .catch(err => console.log(err));
    }

    // Fire event to app-root for route handling
    updateRoute() {
        window.history.pushState({}, '', '/another');
        let routeUpdated = new Event('route-updated');
        this.dispatchEvent(routeUpdated);
    }

    resetForm() {
        this.shadowRoot.querySelector('form').reset();
        this.formErrors = undefined;
    }

    // Get errors by property generated from the backend
    getError(err) {
        return !this.formErrors[err] ? '' : html`<span>${this.formErrors[err]}</span>`;
    }
}
customElements.define('login-view', LoginView);