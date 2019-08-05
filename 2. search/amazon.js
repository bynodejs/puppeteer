'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description Looks for a "nyan cat pullover" on amazon.com, goes two page two clicks the third one.
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com');
    await page.setViewport({ width: 1280, height: 800 });

    await page.type('#twotabsearchtextbox', 'nyan cat pullover');
    await page.click('input.nav-input');
    await page.screenshot({ path: 'amazon_nyan_cat_pullovers_list.png' });

    await page.waitFor(2000);
    await page.click('li.a-last a');

    await page.waitFor(2000);
    const pullovers = await page.$$('a.a-link-normal.a-text-normal');

    await page.waitFor(2000);
    await pullovers[2].click();

    await page.waitFor(2000);
    await page.waitForSelector('#ppd');
    await page.screenshot({ path: 'amazon_product.png' });

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
