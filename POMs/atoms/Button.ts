import { Locator, Page, expect } from "@playwright/test";

export class Button {
    readonly locator: Locator;

    constructor(page: Page, testId: string) {
        this.locator = page.getByTestId(testId);
    }

    async click(): Promise<void> {
        await this.locator.click();
    }

    async checkVisibility(shouldBeVisible: boolean): Promise<void> {
        if (shouldBeVisible) {
            await expect(this.locator).toBeVisible();
        } else {
            await expect(this.locator).toBeHidden();
        }
    }
}
