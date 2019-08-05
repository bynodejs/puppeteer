'use strict';

const puppeteer = require('puppeteer');

/**
* @description Login Github
* `GITHUB_USER=myuser GITHUB_PWD=mypassword node github.js`
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://github.com/login');

    await page.type('#login_field', process.env.GITHUB_USER);
    await page.type('#password', process.env.GITHUB_PWD);
    await page.click('[name="commit"]');
    await page.waitFor(2000);
    await page.screenshot({ path: 'github.png' });
    console.log("screenshot complete");

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
