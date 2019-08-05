'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description Scrapes Hacker News for links on the home page and returns the top 10
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://news.ycombinator.com/news');

    await page.tracing.start({ path: 'trace.json', categories: ['devtools.timeline'] });
    // execute standard javascript in the context of the page.
    const stories = await page.$$eval('a.storylink', anchors => {
      return anchors.map(anchor => anchor.textContent).slice(0, 10);
    });
    console.log("stories : ", stories)
    await page.tracing.stop();

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
