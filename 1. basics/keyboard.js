'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description types into a text editor
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://trix-editor.org/');

    await page.focus('trix-editor');
    await page.keyboard.type('Just adding a title');
    await page.screenshot({ path: 'keyboard.png' });

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
