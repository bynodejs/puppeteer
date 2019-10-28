"use strict";

/**
 * @description load a page that plays back what mouse actions are used on the page.
 * `node mouse.js`
 */

// require modules
const puppeteer = require("puppeteer");

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto("http://unixpapa.com/js/testmouse.html");
    await page.setViewport({ width: 800, height: 600 });

    await page.mouse.click(132, 103, { button: "left" });
    await page.screenshot({ path: "mouse_click.png" });
    console.log("saved");

    await browser.close();
  })();
} catch (error) {
  console.error(error);
}
