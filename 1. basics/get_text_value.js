'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description Gets the text value of an element by using the page.$eval method
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com/news');

    const name = await page.$eval('.hnname > a', el => el.innerText);
    console.log("name : ", name);

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
