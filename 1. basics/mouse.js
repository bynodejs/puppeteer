'use strict';

// require modules
const puppeteer = require('puppeteer');

/**
* @description load a page that plays back what mouse actions are used on the page.
*/
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://unixpapa.com/js/testmouse.html'); // go to a page setup for mouse event tracking
    await page.setViewport({ width: 800, height: 600 }); // set the viewport so we know the dimensions of the screen
    
    await page.mouse.click(132, 103, { button: 'left' }); // click an area
    await page.screenshot({ path: 'mouse_click.png' }); // the screenshot should show feedback from the page that right part was clicked.

    await browser.close();
  })();
} catch (error) {
  console.error(error);
};