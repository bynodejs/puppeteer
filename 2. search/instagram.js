'use strict';

/**
 * @description Search instagram tag
 * `node instagram.js`
 */

// require modules
const puppeteer = require('puppeteer'),
    readline = require('readline-sync');

// declare
let userInput = false;

async function initPupp(url) {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    return { page, browser, url };
};

async function gotoPage(pageInfo) {
    await pageInfo.page.goto(pageInfo.url, { waitUntil: 'networkidle2' });
    await pageInfo.page.setViewport({ width: 1248, height: 1024 });

    return pageInfo;
};

async function pageControl(pageInfo) {
    await pageInfo.page.waitForSelector('.EZdmt');

    const images = await pageInfo.page.$$eval('.Nnq7C img', image => {
        return image.map(image => image.src);
    });

    for (let image of images) {
        await pageInfo.page.goto(image);
        await pageInfo.page.waitFor(2000);
        await pageInfo.page.screenshot({ path: `${new Date().getTime().toString(36)}.png` });
    }

    console.log('saved');
    await pageInfo.browser.close();
};

userInput = readline.question('검색어 입력 (종료는 Ctrl+c) > ');

if (userInput.trim().length > 0) {
    initPupp(`https://www.instagram.com/explore/tags/${userInput}`)
        .then(pageInfo => gotoPage(pageInfo))
        .then(pageInfo => pageControl(pageInfo));
};
