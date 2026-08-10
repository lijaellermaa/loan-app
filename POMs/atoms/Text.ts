import { Locator, Page, expect } from "@playwright/test";

export class Text {
    readonly locator: Locator;

    constructor(page: Page, testId: string) {
        this.locator = page.getByTestId(testId);
    }

    async checkVisibility(shouldBeVisible: boolean): Promise<void> {
        if (shouldBeVisible) {
            await expect(this.locator).toBeVisible();
        } else {
            await expect(this.locator).toBeHidden();
        }
    }

    async getText(): Promise<string> {
        return (await this.locator.textContent()) ?? '';
    }
}
