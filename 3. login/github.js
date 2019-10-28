"use strict";

/**
 * @description Github Login, main, profile screenshot
 * `node github.js`
 */

// require modules
const puppeteer = require("puppeteer"),
  readline = require("readline-sync");

// declare
let userId = false,
  userPassword = false;

async function initPupp(url) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  return { page, browser, url };
}

async function gotoPage(pageInfo) {
  await pageInfo.page.goto(`${pageInfo.url}/login`, {
    waitUntil: "networkidle2"
  });
  await pageInfo.page.setViewport({ width: 1248, height: 1024 });

  return pageInfo;
}

async function loginForm(pageInfo) {
  const userIdForm = await pageInfo.page.$("#login_field");
  await userIdForm.type(userId);

  const userPasswordForm = await pageInfo.page.$("#password");
  await userPasswordForm.type(userPassword);

  await pageInfo.page.click('[name="commit"]');
  await pageInfo.page.waitFor(8000);

  return pageInfo;
}

async function pageControl(pageInfo) {
  await pageInfo.page.screenshot({ path: "main.png" });
  await pageInfo.page.waitFor(1000);

  await pageInfo.page.goto(`${pageInfo.url}/${userId}`, {
    waitUntil: "networkidle2"
  });
  await pageInfo.page.waitFor(2000);

  await pageInfo.page.screenshot({ path: "profile.png" });
  console.log("saved");

  await pageInfo.browser.close();
}

userId = readline.question("아이디 입력 (종료는 Ctrl+c) > ");
userPassword = readline.question("패스워드 입력 (종료는 Ctrl+c) > ");

if (userId.trim().length > 0 && userPassword.trim().length > 0) {
  initPupp("https://github.com/")
    .then(pageInfo => gotoPage(pageInfo))
    .then(pageInfo => loginForm(pageInfo))
    .then(pageInfo => pageControl(pageInfo));
}
