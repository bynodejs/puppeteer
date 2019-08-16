'use strict';

/**
* @description Sets the "login_email" property in a Paypal cookie so the login screen is pre-filled with an email address.
* `node set_cookie.js`
*/

// require modules
const puppeteer = require('puppeteer');

// declare cookie
const cookie = {
  name: 'login_email',
  value: 'set_by_cookie@domain.com',
  domain: '.paypal.com',
  url: 'https://www.paypal.com/',
  path: '/',
  httpOnly: true,
  secure: true
};

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.paypal.com/signin');

    await page.setCookie(cookie);
    await page.screenshot({ path: 'paypal_login.png' });
    console.log('saved');

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};