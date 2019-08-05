'use strict';

const puppeteer = require('puppeteer');

/**
* @description Search youtube 
* `SEARCH=search_content node youtube.js`
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://youtube.com');

    await page.type('#search', process.env.SEARCH);
    await page.click('button#search-icon-legacy');
    await page.waitFor(2000);
    await page.screenshot({ path: 'youtube_search_list.png' });

    const videos = await page.$$('ytd-thumbnail.ytd-video-renderer');
    await videos[2].click();
    await page.waitFor(2000);
    await page.screenshot({ path: 'youtube_search_detail.png' });

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
