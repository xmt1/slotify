import { LitElement, html, css } from 'lit-element';

class RegisterView extends LitElement {
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
                    ${this.formErrors ? this.getError("usernameCharacters") : ''}
                    <label for="username">Username</label>
                    <input
                        required 
                        type="text"
                        placeholder="e.g. bart simpson" 
                        id="username" 
                        name="username">
                </div>
                <div>
                    ${this.formErrors ? this.getError("firstNameCharacters") : ''}
                    <label for="firstName">First Name</label>
                    <input
                        required 
                        type="text"
                        placeholder="e.g. Bart" 
                        id="firstName" 
                        name="firstName">
                </div>
                <div>
                    ${this.formErrors ? this.getError("lastNameCharacters") : ''}
                    <label for="lastName">Last Name</label>
                    <input
                        required 
                        type="text"
                        placeholder="e.g. Simpson" 
                        id="lastName" 
                        name="lastName">
                </div>
                <div>
                    ${this.formErrors ? this.getError("emailsDoNotMatch") : ''}
                    ${this.formErrors ? this.getError("emailInvalid") : ''}
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
                    ${this.formErrors ? this.getError("passwordsDoNotMatch") : ''}
                    ${this.formErrors ? this.getError("passwordNotAlphanumeric") : ''}
                    ${this.formErrors ? this.getError("passwordCharacters") : ''}
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

        this.postData('http://localhost/slotify/register.php', user)
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
        .catch(err => console.log(err))
    }

    // Get errors by property generated from the backend
    getError(err) {
        return !this.formErrors[err] ? '' : html`<span>${this.formErrors[err]}</span>`;
    }
}
customElements.define('register-view', RegisterView);