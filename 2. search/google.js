'use strict';

const puppeteer = require('puppeteer');

/**
* @description Search address 
* `SEARCH="content" node google.js`
*/
try {
    (async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.google.co.kr/maps');

        await page.type('#searchboxinput', process.env.SEARCH);
        await page.click('button.searchbox-searchbutton');
        await page.waitFor(2000);
        await page.screenshot({ path: 'google.png' });

        await browser.close();
    })();
} catch (error) {
    console.error(error);
};
