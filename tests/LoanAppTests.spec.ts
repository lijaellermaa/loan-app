import { test } from '@playwright/test';
import { LoanPage } from "../POMs/pages/LoanPage";
import { FinalPage } from "../POMs/pages/FinalPage";

test('Check loan calculator elements visibility', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await loanPage.goto();
    await loanPage.checkCalculatorElementsVisibility(true);
});

test('Submit loan application full flow', async ({ page }) => {
    const loanPage = new LoanPage(page);
    const finalPage = new FinalPage(page);

    await loanPage.goto();
    await loanPage.fillLoanDetails('1500', '12');

    const loginPopup = await loanPage.clickApply();
    await loginPopup.login('usern', 'pwd');

    await finalPage.checkFinalScreenVisibility(true);
    await finalPage.submitAndConfirmApplication();
});
