'use strict';

const puppeteer = require('puppeteer');

/**
* @description Roketpunch search company list
* `ROKETPUNCH_SEARCH= node roketpunch.js`
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.rocketpunch.com/companies');
    await page.setViewport({ width: 1280, height: 800 });

    await page.type('#id_q', process.env.ROKETPUNCH_SEARCH);
    await page.keyboard.press('Enter');
    await page.waitFor(2000);

    await page.waitForSelector('div#company-list');
    const ehList = await page.$$('div.content');

    for (let eh of ehList) {
      let titles = 'X', contents = 'X', links = 'X';

      let t = await eh.$('strong');
      if (t) {
        titles = await eh.$eval('strong', function (el) {
          return el.textContent.trim();
        });
      }

      let c = await eh.$('.description');
      if (c) {
        contents = await eh.$eval('.description', function (el) {
          return el.textContent.trim();
        });
      }

      let l = await eh.$('> a.link');
      if (l) {
        links = await eh.$eval('a.link', function (el) {
          return el.href.trim();
        });
      }

      console.log(`회사명 : ${titles}  설명 : ${contents}  링크 : ${links}`);
    }

    // await browser.close();
  })();
} catch (error) {
  console.error(error);
};