import { test, expect } from '@playwright/test';

test('Click en el boton Calendario', async({page}) => {
    await page.goto('https://www.promiedos.com.ar/');
    const calendarioBtn = page.locator('.calendario-bottom_button__F_1s4');
    await expect(calendarioBtn).toBeVisible();
    await calendarioBtn.click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL('https://www.promiedos.com.ar/calendario')
    await page.waitForTimeout(6000);
})

test('otro test', async({page}) => {

})
