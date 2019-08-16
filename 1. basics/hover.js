'use strict';

/**
* @description The hover function is a combination of scrolling and putting the mouse into a hover state over the requested element.
* `node hover.js`
*/

// require modules
const puppeteer = require('puppeteer');

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://soundcloud.com/');

    await page.hover('.playableTile__artwork');
    await page.screenshot({ path: 'hover.png' });
    console.log('saved')

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
