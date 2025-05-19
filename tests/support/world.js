const { chromium, firefox, webkit } = require('@playwright/test');
const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
 
const browserType = process.env.BROWSER || 'chromium'; // usa chromium si no se define BROWSER
 
class CustomWorld {
  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}
 
setWorldConstructor(CustomWorld);
 
Before(async function () {
  const browserLauncher = { chromium, firefox, webkit }[browserType];
  this.browser = await browserLauncher.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});
 
After(async function () {
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});