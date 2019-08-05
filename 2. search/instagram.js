'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description hashtag search to instagram
* `SEARCH="content" node instagram.js`
*/
try {
    (async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(`https://www.instagram.com/explore/tags/${encodeURI(process.env.SEARCH)}`);

        await page.waitForSelector('.EZdmt');

        const images = await page.$$eval('.Nnq7C img', image => {
            return image.map(image => image.src)
        });

        for (let image of images) {
            await page.goto(image);
            await page.waitFor(2000);
            await page.screenshot({ path: `${new Date().getTime().toString(36)}.png` });
        }
        await browser.close();
    })();
} catch (error) {
    console.error(error);
};