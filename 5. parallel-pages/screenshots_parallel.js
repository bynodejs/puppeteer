'use strict';

const puppeteer = require('puppeteer');

/**
* @description Allow parallel processing screenshot 
* `node screenshots_parllel.js`
*/
try {
  (async () => {
    puppeteer.launch({ headless: false }).then(async browser => {
      const promises = [];

      for (let i = 0; i < 5; i++) {
        promises.push(browser.newPage().then(async page => {
          await page.goto('https://en.wikipedia.org/wiki/' + i);
          await page.setViewport({ width: 1280, height: 800 });

          await page.screenshot({ path: 'wikipedia_' + i + '.png' });
        }));
      }

      await Promise.all(promises);
      console.log(promises);

      await browser.close();
    })
  })();
} catch (error) {
  console.error(error);
};
