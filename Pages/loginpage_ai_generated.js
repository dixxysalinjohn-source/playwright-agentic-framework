
const { BasePage } = require('./BasePage');

class LoginPage extends BasePage {
    constructor(page) {
        super(page);

        this.loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
        this.forgotPassword = page.getByText('Forgot your password?', { exact: true });
    }

    async goto() {
        await this.page.goto(this.loginUrl);
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async openForgotPassword() {
        await this.forgotPassword.click();
    }

    getByTestId(testId) {
        return this.page.getByTestId(testId);
    }
}

module.exports = { LoginPage };
