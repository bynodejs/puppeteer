'use strict';

/**
* @description Use the built in devices descriptors to emulate an Iphone 6.
* `node emulate_devices.js`
*/

// require modules
const puppeteer = require('puppeteer'),
  devices = require('puppeteer/DeviceDescriptors');

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://google.com/');

    await page.emulate(devices['iPhone 6']);
    await page.screenshot({ path: `iPhone 6.png`, fullPage: true });
    console.log("Title > ", await page.title());

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
