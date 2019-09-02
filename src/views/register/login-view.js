import { LitElement, html, css } from 'lit-element';

class LoginView extends LitElement {
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
        <div id="inputContainer">
            <form 
                action="#" 
                id="loginForm" 
                method="POST" 
                @submit="${this.onLogin}">
                <h2>Login to your account</h2>
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
        this.postData('http://localhost/slotify/login.php', user);
    }

    postData(url = '', data = {}) {
        fetch(url, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(data)
        })
        .then((response) => {
            console.log(response);
        })
        .catch(err => console.log(err))
    }
}
customElements.define('login-view', LoginView);