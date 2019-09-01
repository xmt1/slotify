import { LitElement, html, css } from 'lit-element';

class RegisterView extends LitElement {
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
        this.componentName = this.tagName;
    }

    render() {
        return html`
        <div id="inputContainer">
            <form 
                action="#" 
                id="loginForm" 
                method="POST" 
                @submit="${this.onFormSubmit}">
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
                
            <!-- <form action="" id="registerForm" method="POST">
                <h2>Create your free account</h2>
                <div>
                    <label for="username">Username</label>
                    <input
                        required 
                        type="text"
                        placeholder="e.g. bart simpson" 
                        id="username" 
                        name="username">
                </div>
                <div>
                    <label for="firstName">First Name</label>
                    <input
                        required 
                        type="text"
                        placeholder="e.g. Bart" 
                        id="firstName" 
                        name="firstName">
                </div>
                <div>
                    <label for="lastName">Last Name</label>
                    <input
                        required 
                        type="text"
                        placeholder="e.g. Simpson" 
                        id="lastName" 
                        name="lastName">
                </div>
                <div>
                    <label for="email">Email</label>
                    <input
                        required 
                        type="email"
                        placeholder="e.g. bart@gmail.com" 
                        id="email" 
                        name="email">
                </div>
                <div>
                    <label for="email2">Confirm Email</label>
                    <input
                        required 
                        type="email"
                        placeholder="e.g. bart@gmail.com" 
                        id="email2" 
                        name="email2">
                </div>
                <div>
                    <label for="password">Password</label>
                    <input
                        required 
                        type="password"
                        id="password" 
                        name="password">
                </div>
                <div>
                    <label for="password2">Confirm Password</label>
                    <input
                        required 
                        type="password"
                        id="password2" 
                        name="password2">
                </div>
                <button type="submit" name="registerButton">Sign Up</button>
            </form> -->

        </div>
    `;
    }

    onFormSubmit(e) {
        e.preventDefault();
        const loginUsername = this.shadowRoot.querySelector('#loginUsername');
        const loginPassword = this.shadowRoot.querySelector('#loginPassword');
        const user = {
            username: loginUsername.value,
            password: loginPassword.value
        }
        this.postData('http://localhost/slotify/register.php', user);
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
        });
    }
}
customElements.define('register-view', RegisterView);