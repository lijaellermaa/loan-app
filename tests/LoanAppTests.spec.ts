import { test, expect } from '@playwright/test';
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

test('Should display intercepted mock calculation value (Status 200)', async ({ page }) => {
    const loanPage = new LoanPage(page);
    const mockedAmount = '55.5';

    await loanPage.setupLoanMock(200, { paymentAmountMonthly: mockedAmount });

    const responsePromise = loanPage.waitForCalculatorResponse();
    await loanPage.goto();
    await responsePromise;

    const actualAmount = await loanPage.getMonthlyPaymentText();
    expect(actualAmount).toBe(mockedAmount);
});

test('Should handle server error (Status 500, empty body)', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await loanPage.setupLoanMock(500);

    const responsePromise = loanPage.waitForCalculatorResponse();
    await loanPage.goto();
    await responsePromise;

    await loanPage.errorMessage.checkVisibility(true);

    const errorText = await loanPage.errorMessage.getText();
    expect(errorText).toContain('Oops, something went wrong');
});

test('Should handle success status with missing response data (Status 200, empty object)', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await loanPage.setupLoanMock(200, {});

    const responsePromise = loanPage.waitForCalculatorResponse();
    await loanPage.goto();
    await responsePromise;

    const actualAmount = await loanPage.getMonthlyPaymentText();
    expect(actualAmount).toBe('undefined');
});

test('Should handle response body with incorrect key name (Status 200, invalid key)', async ({ page }) => {
    const loanPage = new LoanPage(page);

    await loanPage.setupLoanMock(200, { wrongKeyName: 42.8 });

    const responsePromise = loanPage.waitForCalculatorResponse();
    await loanPage.goto();
    await responsePromise;

    const actualAmount = await loanPage.getMonthlyPaymentText();
    expect(actualAmount).toBe('undefined');
});
