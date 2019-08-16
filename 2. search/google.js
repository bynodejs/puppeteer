'use strict';

/**
* @description Search google maps
* `node google.js`
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

async function searchForm(pageInfo) {
    const inputForm = await pageInfo.page.$('#searchboxinput');
    await inputForm.type(userInput);
    await inputForm.press('Enter');

    await pageInfo.page.waitFor(3000);

    return pageInfo;
};

async function pageControl(pageInfo) {
    await pageInfo.page.screenshot({ path: 'google.png' });
    console.log('saved');

    await pageInfo.browser.close();
};

userInput = readline.question('검색어 입력 (종료는 Ctrl+c) > ');

if (userInput.trim().length > 0) {
    initPupp('https://www.google.co.kr/maps')
        .then(pageInfo => gotoPage(pageInfo))
        .then(pageInfo => searchForm(pageInfo))
        .then(pageInfo => pageControl(pageInfo));
};
