'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description Get the title of a page and print it to the console.
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');

    const title = await page.title();
    console.log("title : ", title);

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
