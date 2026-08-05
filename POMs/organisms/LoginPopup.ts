import { Page } from "@playwright/test";
import { Input } from "../atoms/Input";
import { Button } from "../atoms/Button";

export class LoginPopup {
    readonly page: Page;
    private readonly usernameInput: Input;
    private readonly passwordInput: Input;
    private readonly continueButton: Button;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = new Input(page, 'login-popup-username-input');
        this.passwordInput = new Input(page, 'login-popup-password-input');
        this.continueButton = new Button(page, 'login-popup-continue-button');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.continueButton.click();
    }
}
