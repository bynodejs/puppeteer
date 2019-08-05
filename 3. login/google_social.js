'use strict';

const puppeteer = require('puppeteer');

/**
* @description Google social Login
* `GOOGLE_USER=myuser GOOGLE_PWD=mypassword node google_social.js`
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://app.checklyhq.com/login');
    await page.setViewport({ width: 1280, height: 800 });


    const navigationPromise = page.waitForNavigation();
    await page.waitForSelector('div > .social > .text-center > .login-google-button > span');
    await page.click('div > .social > .text-center > .login-google-button > span');

    await navigationPromise;
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', process.env.GOOGLE_USER);
    await page.click('#identifierNext');

    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', process.env.GOOGLE_PWD);

    await page.waitForSelector('#passwordNext', { visible: true });
    await page.click('#passwordNext');

    await navigationPromise;

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
