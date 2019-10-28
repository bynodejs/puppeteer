"use strict";

/**
 * @description Scrapes Hacker News for links on the home page and returns the top 10
 * `node get_list_of_links.js`
 */

// require modules
const puppeteer = require("puppeteer");

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://google.com");
    await page.tracing.start({
      path: "trace.json",
      categories: ["devtools.timeline"]
    });
    await page.tracing.stop();

    await browser.close();
  })();
} catch (error) {
  console.error(error);
}
