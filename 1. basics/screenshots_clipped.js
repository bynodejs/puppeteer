'use strict';

// require modules
const puppeteer = require('puppeteer');

// screenshot options
const options = {
  path: 'clipped_stocktickers.png',
  fullPage: false,
  clip: {
    x: 0,
    y: 240,
    width: 1000,
    height: 100
  }
};

/**
* @description Grabs and clips out just the stock tickers on the Yahoo finance page
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://finance.yahoo.com/');
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.screenshot(options);

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};