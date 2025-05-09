// @ts-check
import { test, expect } from '@playwright/test';

const {chromium} = require("playwright");

(async()=>{
    const browser = await chromium.launch({ headless: false} );//se ejecutan los test 1x1 (headless)
    const page = await browser.newPage();
    await page.goto('https://www.lavoz.com');
    await page.screenshot({path: 'lavoz-screenshot.png'});
    await browser.close();
})();

