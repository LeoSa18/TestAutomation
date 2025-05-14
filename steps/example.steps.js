const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { chromium, expect } = require('@playwright/test');

let browser, context, page;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

After(async function () {
  await page.close();
  await context.close();
  await browser.close();
});

Given('I am on the Demoblaze homepage', async function () {
  await page.goto('https://www.demoblaze.com/index.html');
});

When('I log in with username {string} and password {string}', async function (username, password) {
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill(username);
  await page.locator('#loginpassword').fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();
});

When('I add the first product to the cart', async function () {
  await page.locator('.card > a').first().click();
  page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Home (current)' }).click();
});

When('I add the second product to the cart', async function () {
  await page.locator('div:nth-child(6) > .card > a').click();
  page.once('dialog', dialog => dialog.dismiss().catch(() => {}));
  await page.getByRole('link', { name: 'Add to cart' }).click();
});

When('I go to the cart and place an order with:', async function (dataTable) {
  await page.getByRole('link', { name: 'Cart', exact: true }).click();
  await page.getByRole('button', { name: 'Place Order' }).click();
  const data = dataTable.rowsHash();
  await page.getByRole('textbox', { name: 'Name:' }).fill(data['Name']);
  await page.getByRole('textbox', { name: 'Country:' }).fill(data['Country']);
  await page.getByRole('textbox', { name: 'City:' }).fill(data['City']);
  await page.getByRole('textbox', { name: 'Credit card:' }).fill(data['Credit card']);
  await page.getByRole('textbox', { name: 'Month:' }).fill(data['Month']);
  await page.getByRole('textbox', { name: 'Year:' }).fill(data['Year']);
  await page.getByRole('button', { name: 'Purchase' }).click();
});

Then('I should see {string}', async function (message) {
  await expect(page.getByRole('heading', { name: message })).toBeVisible();
  await page.getByRole('button', { name: 'OK' }).click();
});
 