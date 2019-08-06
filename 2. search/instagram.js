'use strict';

/**
 * @description instagram tag 검색
 */

// require modules
const puppeteer = require('puppeteer'),
    readline = require('readline-sync');

let userInput = false;

async function initPupp(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.setViewport({ width: 1248, height: 1024 });

    return page;
};

async function pageControl(pageInfo) {

    await pageInfo.waitForSelector('.EZdmt');

    const images = await pageInfo.$$eval('.Nnq7C img', image => {
        return image.map(image => image.src);
    });

    for (let image of images) {
        await pageInfo.goto(image);
        await pageInfo.waitFor(2000);
        await pageInfo.screenshot({ path: `${new Date().getTime().toString(36)}.png` });
    }

    console.log('saved');
    await pageInfo.browser.close();
};

userInput = readline.question('검색어 입력 (종료는 Ctrl+c) > ');

if (userInput.trim().length > 0) {
    initPupp(`https://www.instagram.com/explore/tags/${userInput}`)
        .then(pageInfo => pageControl(pageInfo));
};
