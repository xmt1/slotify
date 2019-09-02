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
        
    }

    render() {
        return html`
        <div id="inputContainer">
            <form 
                action="#" 
                id="registerForm" 
                method="POST"
                @submit="${this.onRegister}">
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
            </form>

        </div>
    `;
    }

    onRegister(e) {
        e.preventDefault();
        const username = this.shadowRoot.querySelector('#username');
        const firstName = this.shadowRoot.querySelector('#firstName');
        const lastName = this.shadowRoot.querySelector('#lastName');
        const email = this.shadowRoot.querySelector('#email');
        const email2 = this.shadowRoot.querySelector('#email2');
        const password = this.shadowRoot.querySelector('#password');
        const password2 = this.shadowRoot.querySelector('#password2');

        const user = {
            username: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            email2: email2.value,
            password: password.value,
            password2: password2.value
        }

        console.log(user);

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
        })
        .catch(err => console.log(err))
    }
}
customElements.define('register-view', RegisterView);