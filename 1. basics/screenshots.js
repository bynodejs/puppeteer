'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description Snaps a basic screenshot of the full New York Time homepage and saves it a .png file.
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.nytimes.com/');
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.screenshot({ path: 'nytimes.png', fullPage: true });

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
