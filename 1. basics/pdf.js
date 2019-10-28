"use strict";

/**
 * @description Renders a PDF of the Puppeteer API spec. This is a pretty long page and will generate a nice, A4 size multi-page PDF.
 * `node pdf.js`
 */

// require modules
const puppeteer = require("puppeteer");

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    const page = await browser.newPage();

    await page.goto("https://google.com");
    await page.pdf({ path: "google.pdf", format: "A4" });

    await browser.close();
  })();
} catch (error) {
  console.error(error);
}
