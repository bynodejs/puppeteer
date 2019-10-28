"use strict";

/**
 * @description emulate Setup
 * `node emulate_devices.js`
 */

// require modules
const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://google.com");
    await page.emulate(devices["iPhone X"]);
    await page.screenshot({ path: `iPhone X.png`, fullPage: true });

    await browser.close();
  })();
} catch (error) {
  console.error(error);
}
