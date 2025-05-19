const { When} = require('@cucumber/cucumber');

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