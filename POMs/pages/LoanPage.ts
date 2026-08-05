import { Page } from "@playwright/test";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { LoginPopup } from "../organisms/LoginPopup";

export class LoanPage {
    readonly page: Page;
    private readonly url = 'https://loan-app.tallinn-learning.ee/small-loan';

    private readonly amountInput: Input;
    private readonly periodSelect: Select;
    private readonly applyButton: Button;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = new Input(page, 'id-small-loan-calculator-field-amount');
        this.periodSelect = new Select(page, 'ib-small-loan-calculator-field-period');
        this.applyButton = new Button(page, 'id-small-loan-calculator-field-apply');
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }

    async checkCalculatorElementsVisibility(shouldBeVisible: boolean): Promise<void> {
        await this.amountInput.checkVisibility(shouldBeVisible);
        await this.periodSelect.checkVisibility(shouldBeVisible);
        await this.applyButton.checkVisibility(shouldBeVisible);
    }

    async fillLoanDetails(amount: string, period: string): Promise<void> {
        await this.amountInput.fill(amount);
        await this.periodSelect.selectOption(period);
    }

    async clickApply(): Promise<LoginPopup> {
        await this.applyButton.click();
        return new LoginPopup(this.page);
    }
}
