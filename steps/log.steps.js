const { Given, When} = require('@cucumber/cucumber');


Given('I am on the Demoblaze homepage', async function () {
  await this.page.goto('https://www.demoblaze.com/index.html');
});

When('I log in with username {string} and password {string}', async function (username, password) {
  await this.page.getByRole('link', { name: 'Log in' }).click();
  await this.page.locator('#loginusername').fill(username);
  await this.page.locator('#loginpassword').fill(password);
  await this.page.getByRole('button', { name: 'Log in' }).click();
});