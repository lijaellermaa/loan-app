import { Locator, Page, expect } from "@playwright/test";

export class Select {
    readonly locator: Locator;

    constructor(page: Page, testId: string) {
        this.locator = page.getByTestId(testId);
    }

    async selectOption(value: string): Promise<void> {
        await this.locator.selectOption(value);
    }

    async checkVisibility(shouldBeVisible: boolean): Promise<void> {
        if (shouldBeVisible) {
            await expect(this.locator).toBeVisible();
        } else {
            await expect(this.locator).toBeHidden();
        }
    }
}
