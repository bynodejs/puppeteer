'use strict';

/**
* @description Renders a PDF of the Puppeteer API spec. This is a pretty long page and will generate a nice, A4 size multi-page PDF.
* `node pdf.js`
*/

// require modules
const puppeteer = require('puppeteer');

try {
  (async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pdf'); // Create PDF from URL

    await page.pdf({ path: 'github.pdf', format: 'A4' });
    console.log('saved');

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};
