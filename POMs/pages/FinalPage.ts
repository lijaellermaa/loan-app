import { Page } from "@playwright/test";
import { Button } from "../atoms/Button";

export class FinalPage {
    readonly page: Page;
    private readonly finalContinueButton: Button;
    private readonly finalSuccessOkButton: Button;

    constructor(page: Page) {
        this.page = page;
        this.finalContinueButton = new Button(page, 'final-page-continue-button');
        this.finalSuccessOkButton = new Button(page, 'final-page-success-ok-button');
    }

    async checkFinalScreenVisibility(shouldBeVisible: boolean): Promise<void> {
        await this.finalContinueButton.checkVisibility(shouldBeVisible);
    }

    async submitAndConfirmApplication(): Promise<void> {
        await this.finalContinueButton.click();
        await this.finalSuccessOkButton.click();
    }
}
