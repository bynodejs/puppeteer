'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description Looks for a SuperDeals list to Gmarket
*/
try {
    (async () => {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto("http://corners.gmarket.co.kr/SuperDeals");

        let ehList = await page.$$("li.masonry-brick");
        
        for (let eh of ehList) {
            let title = await eh.$eval('span.title', function (el) {
                return el.innerText;
            });

            let price = await eh.$eval('span.price strong', function (el) {
                return el.innerText;
            });
            console.log({ "title": title, "price": price });
        }

        await browser.close();
    })();
} catch (error) {
    console.error(error);
};
