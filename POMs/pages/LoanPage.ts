import { Page } from "@playwright/test";
import { Input } from "../atoms/Input";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import { LoginPopup } from "../organisms/LoginPopup";

export class LoanPage {
    readonly page: Page;
    private readonly url = 'https://loan-app.tallinn-learning.ee/small-loan';
    private readonly routePattern = '**/api/loan-calc*';

    private readonly amountInput: Input;
    private readonly periodSelect: Select;
    private readonly applyButton: Button;

    readonly monthlyPaymentValue: Text;
    readonly errorMessage: Text;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = new Input(page, 'id-small-loan-calculator-field-amount');
        this.periodSelect = new Select(page, 'ib-small-loan-calculator-field-period');
        this.applyButton = new Button(page, 'id-small-loan-calculator-field-apply');

        this.monthlyPaymentValue = new Text(page, 'ib-small-loan-calculator-field-monthlyPayment');
        this.errorMessage = new Text(page, 'id-small-loan-calculator-field-error');
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

    waitForCalculatorResponse(): Promise<any> {
        return this.page.waitForResponse(this.routePattern);
    }

    async setupLoanMock(status: number, bodyContent?: object | string): Promise<void> {
        await this.page.route(this.routePattern, async (route) => {
            const options: any = {
                status: status,
                contentType: 'application/json'
            };

            if (bodyContent !== undefined) {
                options.body = typeof bodyContent === 'string' ? bodyContent : JSON.stringify(bodyContent);
            }

            await route.fulfill(options);
        });
    }

    async getMonthlyPaymentText(): Promise<string> {
        const text = await this.monthlyPaymentValue.getText();
        return text.replace('€', '').trim();
    }
}
