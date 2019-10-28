"use strict";

/**
 * @description Search booking hotel List
 * `node booking.js`
 */

// require modules
const puppeteer = require("puppeteer"),
  readline = require("readline-sync");

// declare
let userInput = false;

async function initPupp(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  return { page, browser, url };
}

async function gotoPage(pageInfo) {
  await pageInfo.page.goto(pageInfo.url, { waitUntil: "networkidle2" });
  await pageInfo.page.setViewport({ width: 1248, height: 1024 });

  return pageInfo;
}

async function searchForm(pageInfo) {
  const inputForm = await pageInfo.page.$("#ss");
  await inputForm.type(userInput);
  await inputForm.press("Enter");

  await pageInfo.page.waitFor(3000);

  return pageInfo;
}

async function pageControl(pageInfo) {
  await pageInfo.page.waitForSelector("#hotellist_inner");

  const hotels = await pageInfo.page.$$eval("span.sr-hotel__name", anchors => {
    return anchors.map(anchor => anchor.textContent.trim()).slice(0, 10);
  });
  console.log("호텔 리스트 > \n", hotels, "\n");

  await pageInfo.browser.close();
}

userInput = readline.question("검색어 입력 (종료는 Ctrl+c) > ");

if (userInput.trim().length > 0) {
  initPupp("https://booking.com")
    .then(pageInfo => gotoPage(pageInfo))
    .then(pageInfo => searchForm(pageInfo))
    .then(pageInfo => pageControl(pageInfo));
}
