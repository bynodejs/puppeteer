"use strict";

const puppeteer = require("puppeteer");

/**
 * @description Looks for a Nintendo's Mario Odyssey and adds it to the shopping cart.
 * `node walmart.js`
 */
try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(
      "https://www.walmart.com/ip/Super-Mario-Odyssey-Nintendo-Switch/56011600",
      { waitUntil: "networkidle2" }
    );
    await page.setViewport({ width: 1280, height: 800 });

    await page.click("button.prod-ProductCTA--primary");
    await page.waitForSelector(".Cart-PACModal-ItemInfoContainer");
    await page.screenshot({ path: "super-mario-odyssey.png" });
    console.log("saved");

    await browser.close();
  })();
} catch (error) {
  console.error(error);
}
