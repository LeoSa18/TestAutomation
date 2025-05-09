import { test, expect } from '@playwright/test';

test('Log in', async({page}) => {
    await page.goto('https://www.demoblaze.com/index.html');
    const login = page.locator('#login2');
    await expect(login).toBeVisible();
    await login.click();
    const username = page.locator('#loginusername');
    await username.fill('LeoInter');
    const contra = page.locator('#loginpassword');
    await contra.fill('test');
    const login2 = page.locator('#logInModal > div > div > div.modal-footer > button.btn.btn-primary');
    await login2.click();
    const logout = page.locator('#logout2');

    //Agregar prodcuto al carrito
    const producto1 = page.locator('#tbodyid > div:nth-child(1) > div > div > h4');
    await expect(producto1).toBeVisible();
    await producto1.click();
    const agregar = page.locator('#tbodyid > div.row > div > a');
    await agregar.click();
    await page.locator('#navbarExample > ul > li.nav-item.active > a').click();
    await page.locator('#tbodyid > div:nth-child(2) > div > div > h4 > a').click();
    await agregar.click();
    
    //visualizar el carrito
    await page.locator('#cartur').click();

    //realizar el pedido
    //await page.locator('#page-wrapper button').click();
    await page.getByRole('button', { name: 'Place Order' }).click();
    
    //Completar el formulario
    await page.locator('#name').fill('luciano');
    await page.locator('#country').fill('argentina');
    await page.locator('#city').fill('cordoba');
    await page.locator('#card').fill('1234567890');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2040');
    await page.getByRole('button', { name: 'Purchase' }).click();
   // await e page.locator('body > div.sweet-alert.showSweetAlert.visible > h2').expect
    await page.getByText('Thank you for your purchase!' ).click();

    //Hacer click en ok
    await page.locator("body > div.sweet-alert.showSweetAlert.visible > div.sa-button-container > div > button").click();
    await page.waitForTimeout(5000);
})



