'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
 * @description Create an alert dialog and close it again.
 */
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');

    page.on('dialog', async dialog => {
      console.log("dialog message : ", dialog.message());
      await dialog.dismiss();
    });
    await page.evaluate(() => alert('This message is inside an alert box'));

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
