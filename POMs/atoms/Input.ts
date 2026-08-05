import { Locator, Page, expect } from "@playwright/test";

export class Input {
    readonly locator: Locator;

    constructor(page: Page, testId: string) {
        this.locator = page.getByTestId(testId);
    }

    async fill(value: string): Promise<void> {
        await this.locator.fill(value);
    }

    async checkVisibility(shouldBeVisible: boolean): Promise<void> {
        if (shouldBeVisible) {
            await expect(this.locator).toBeVisible();
        } else {
            await expect(this.locator).toBeHidden();
        }
    }
}
