'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description Finds accommodations in Berlin on Booking.com, takes a screenshot and logs the top 10.
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://booking.com');

    await page.type('#ss', 'Berlin');
    await page.click('.sb-searchbox__button');
    await page.waitForSelector('#hotellist_inner');
    await page.screenshot({ path: 'booking.png' });
    const hotels = await page.$$eval('span.sr-hotel__name', anchors => {
      return anchors.map(anchor => anchor.textContent.trim()).slice(0, 10)
    });
    console.log("hotels : ", hotels);

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
