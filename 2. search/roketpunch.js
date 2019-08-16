'use strict';

/**
* @description Search roketpunch company
* `node roketpunch.js`
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
  const inputForm = await pageInfo.page.$('#id_q');
  await inputForm.type(userInput);
  await inputForm.press('Enter');

  await pageInfo.page.waitFor(1000);

  return pageInfo;
};

async function pageControl(pageInfo) {
  let buffer = [];

  await pageInfo.page.waitForSelector('div#company-list');
  const ehList = await pageInfo.page.$$('div.company');

  for (let eh of ehList) {
    let titles = 'X', contents = 'X', links = 'X';

    let t = await eh.$('strong');
    if (t) {
      titles = await eh.$eval('strong', function (el) {
        return el.textContent.trim();
      });
    }

    let c = await eh.$('.description');
    if (c) {
      contents = await eh.$eval('.description', function (el) {
        return el.textContent.trim();
      });
    }

    let l = await eh.$('a.link');
    if (l) {
      links = await eh.$eval('a.link', function (el) {
        return el.href.trim();
      });
    }

    buffer.push({ title: titles, content: contents, link: links });
  }
  console.log(buffer);

  await pageInfo.browser.close();
};

userInput = readline.question('검색어 입력 (종료는 Ctrl+c) > ');

if (userInput.trim().length > 0) {
  initPupp('https://www.rocketpunch.com/companies')
    .then(pageInfo => gotoPage(pageInfo))
    .then(pageInfo => searchForm(pageInfo))
    .then(pageInfo => pageControl(pageInfo));
};
