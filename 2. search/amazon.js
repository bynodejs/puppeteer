'use strict';

/**
* @description Search amazon product
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
  const inputForm = await pageInfo.page.$('#twotabsearchtextbox');
  await inputForm.type(userInput);
  await inputForm.press('Enter');

  await pageInfo.page.waitFor(3000);

  return pageInfo;
};

async function pageControl(pageInfo) {
  await pageInfo.page.screenshot({ path: 'prduct_list.png' });
  await pageInfo.page.waitFor(2000);

  await pageInfo.page.click('li.a-last a');
  await pageInfo.page.waitFor(2000);

  const pullovers = await pageInfo.page.$$('a.a-link-normal.a-text-normal');
  await pageInfo.page.waitFor(2000);
  await pullovers[2].click();
  await pageInfo.page.waitFor(2000);

  await pageInfo.page.waitForSelector('#ppd');
  await pageInfo.page.screenshot({ path: 'product_detail.png' });
  console.log('saved');

  await pageInfo.browser.close();
};

userInput = readline.question('검색어 입력 (종료는 Ctrl+c) > ');

if (userInput.trim().length > 0) {
  initPupp('https://www.amazon.com')
    .then(pageInfo => gotoPage(pageInfo))
    .then(pageInfo => searchForm(pageInfo))
    .then(pageInfo => pageControl(pageInfo));
};
