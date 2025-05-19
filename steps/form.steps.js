const { When, Then,} = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

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