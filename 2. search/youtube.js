'use strict';

/**
 * @description Youtube 검색 스샷
 */

// require modules
const puppeteer = require('puppeteer'),
  readline = require('readline-sync');

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
  const inputForm = await pageInfo.page.$('#search');
  await inputForm.type(userInput);
  await inputForm.press('Enter');

  await pageInfo.page.waitFor(1000);

  return pageInfo;
};

async function pageControl(pageInfo) {
  await pageInfo.page.screenshot({ path: 'youtube_search_list.png' });
  const videos = await pageInfo.page.$$('ytd-thumbnail.ytd-video-renderer');
  await videos[2].click();
  await pageInfo.page.waitFor(2000);
  await pageInfo.page.screenshot({ path: 'youtube_search_detail.png' });

  console.log('saved')
  await pageInfo.browser.close();
};

userInput = readline.question('검색어 입력 (종료는 Ctrl+c) > ');

if (userInput.trim().length > 0) {
  initPupp('https://youtube.com')
    .then(pageInfo => gotoPage(pageInfo))
    .then(pageInfo => searchForm(pageInfo))
    .then(pageInfo => pageControl(pageInfo));
};
