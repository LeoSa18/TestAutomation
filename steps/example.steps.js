const { Given, When, Then, setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

class CustomWorld {
  async launchBrowser() {
    this.browser = await chromium.launch({ headless: false }); // set headless: false for UI
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }
  async closeBrowser() {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
  }
}
setWorldConstructor(CustomWorld);

Before(async function () {
  await this.launchBrowser();
});

After(async function () {
  await this.closeBrowser();
});

Given('I am on the Demoblaze homepage', async function () {
  await this.page.goto('https://www.demoblaze.com/index.html');
});

When('I log in with username {string} and password {string}', async function (username, password) {
  await this.page.getByRole('link', { name: 'Log in' }).click();
  await this.page.locator('#loginusername').fill(username);
  await this.page.locator('#loginpassword').fill(password);
  await this.page.getByRole('button', { name: 'Log in' }).click();
});

When('I add the first product to the cart', async function () {
  await this.page.locator('.card > a').first().click();
  this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
  await this.page.getByRole('link', { name: 'Add to cart' }).click();
  await this.page.getByRole('link', { name: 'Home (current)' }).click();
});

When('I add the second product to the cart', async function () {
  await this.page.locator('div:nth-child(6) > .card > a').click();
  this.page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
  await this.page.getByRole('link', { name: 'Add to cart' }).click();
});

When('I go to the cart and place an order with:', async function (dataTable) {
  await this.page.getByRole('link', { name: 'Cart', exact: true }).click();
  await this.page.getByRole('button', { name: 'Place Order' }).click();
  const data = dataTable.rowsHash();
  await this.page.getByRole('textbox', { name: 'Name:' }).fill(data['Name']);
  await this.page.getByRole('textbox', { name: 'Country:' }).fill(data['Country']);
  await this.page.getByRole('textbox', { name: 'City:' }).fill(data['City']);
  await this.page.getByRole('textbox', { name: 'Credit card:' }).fill(data['Credit card']);
  await this.page.getByRole('textbox', { name: 'Month:' }).fill(data['Month']);
  await this.page.getByRole('textbox', { name: 'Year:' }).fill(data['Year']);
  await this.page.getByRole('button', { name: 'Purchase' }).click();
});

Then('I should see {string}', async function (message) {
  await expect(this.page.getByRole('heading', { name: message })).toBeVisible();
  await this.page.getByRole('button', { name: 'OK' }).click();
});
 