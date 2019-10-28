"use strict";

/**
 * @description bike data crawling
 * `node bike.naver.js`
 */

// require modules
const puppeteer = require("puppeteer"),
  readline = require("readline-sync"),
  cheerio = require("cheerio"),
  Excel = require("exceljs");

// declare
let userInput = false;

async function initPupp(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  return { page, browser, url };
}

async function gotoPage(pageInfo) {
  await pageInfo.page.goto(pageInfo.url, { waitUntil: "networkidle2" });
  await pageInfo.page.setViewport({ width: 1248, height: 1024 });

  return pageInfo;
}

async function pageControl(pageInfo) {
  let contents = [],
    pages = 1;

  while (1) {
    console.log("pages number : ", pages++);

    pageInfo = await getPaging(pageInfo);
    contents = contents.concat(await getContent(pageInfo));

    if (
      !pageInfo.paging.next.get(0) ||
      pageInfo.paging.next.get(0).tagName !== "a"
    ) {
      console.log("====================================");
      console.log("END DATA");
      console.log("====================================");
      break;
    }

    pageInfo.page.click("div.paginate2 > strong + a", { delay: 150 });
    await pageInfo.page.waitFor(1000);
  }

  pageInfo.browser.close();
  makeExcel(contents, pageInfo);
}

async function getPaging(pageInfo) {
  let $ = cheerio.load(await pageInfo.page.content());

  pageInfo.paging = {
    curPage: $("div.paginate2 > strong").text(),
    nextCurPage: $("div.paginate2 > strong + a"),
    next: $("div.paginate2 > .next")
  };

  return pageInfo;
}

async function getContent(pageInfo) {
  let name,
    img,
    kind,
    price,
    cc,
    fuel_efficiency,
    fuel,
    engin,
    output,
    strok,
    toke,
    compression;
  let promises = [],
    buffer = [],
    href = [];
  let $ = cheerio.load(await pageInfo.page.content());

  $("#content > div.model_group_new > ul.model_lst.motorbike.short > li").each(
    (i, ele) => {
      href.push(
        `https://auto.naver.com${
          $(ele)
            .find("div.model_ct > div.sum > span.thmb > a")
            .get(0).attribs.href
        }`
      );
    }
  );

  for (let i = 0; i < href.length; i++) {
    promises.push(
      pageInfo.browser.newPage().then(async page => {
        await page.setViewport({ width: 1280, height: 800 });
        try {
          await page.goto(href[i]);

          await page.click("div#content > div.tab_mnu > ul.mnu_lst > li.data", {
            delay: 150
          });
          await page.waitFor(2000);

          $ = cheerio.load(await page.content());

          name = $("div#container > div.end_tit_area > div.end_model > h3")
            .text()
            .trim();
          img = $(
            "div#container > div.data_spot > div.data_thmb > span.thmb > img"
          ).get(0).attribs.src;

          await $("div.data_info > dl.info_lst > dd").each(async (j, el) => {
            switch (j) {
              case 0:
                {
                  kind = $(el)
                    .find("em.pnt")
                    .text()
                    .trim();
                }
                break;
              case 1:
                {
                  price = $(el)
                    .find("p.thm")
                    .text()
                    .trim()
                    ? $(el)
                        .find("p.thm")
                        .text()
                        .trim()
                    : "가격정보없음";
                }
                break;
              case 2:
                {
                  cc = $(el)
                    .find("p.thm")
                    .text()
                    .trim();
                }
                break;
              case 3:
                {
                  fuel_efficiency = $(el)
                    .find("p.thm")
                    .text()
                    .trim()
                    ? $(el)
                        .find("p.thm")
                        .text()
                        .trim()
                    : "정보없음";
                }
                break;
              case 4:
                {
                  fuel = $(el)
                    .text()
                    .trim();
                }
                break;
              case 5:
                {
                  const len = $(el)
                    .text()
                    .indexOf("도움말");

                  engin = $(el)
                    .text()
                    .substring(0, len)
                    .replace(/ /gi, "")
                    .replace(/,/gi, ", ")
                    .replace(/\n/gi, "")
                    .trim();
                }
                break;
            }
          });

          await $("div.data_cont > div.cont_area > table.tblst > tbody")
            .first()
            .find("tr")
            .each(async (j, el) => {
              switch (j) {
                case 0:
                  {
                    output = $(el)
                      .find("td")
                      .first()
                      .text()
                      .trim();
                    strok = $(el)
                      .find("td")
                      .last()
                      .text()
                      .trim();
                  }
                  break;
                case 1:
                  {
                    toke = $(el)
                      .find("td")
                      .first()
                      .text()
                      .trim();
                    compression = $(el)
                      .find("td")
                      .last()
                      .text()
                      .trim();
                  }
                  break;
              }
            });

          buffer.push({
            name: name, // 바이크명
            img: img, // 이미지
            kind: kind, // 장르
            price: price, // 출시가
            cc: cc, // 배기량
            fuel_efficiency: fuel_efficiency, // 연비
            fuel: fuel, // 연료
            engin: engin, // 엔진형식
            output: output, //최대출력
            strok: strok, // 스토로크
            toke: toke, // 최대 토크
            compression: compression // 압축비
          });

          page.close();
        } catch (err) {
          console.error("[ERROR] : ", err);
        }
      })
    );
  }

  await Promise.all(promises);
  return buffer;
}

async function makeExcel(data, pageInfo) {
  var workbook = new Excel.Workbook();
  var worksheet = workbook.addWorksheet("Result");

  worksheet.columns = Object.keys(data[0]).map(function(v, i) {
    return { header: v.charAt(0).toUpperCase() + v.slice(1), key: v };
  });

  worksheet.addRows(data);

  workbook.xlsx.writeFile(userInput + ".xlsx").then(function() {
    console.log("saved");
  });

  pageInfo.browser.close();
}

userInput = readline.question("파일명 입력 (종료는 Ctrl+c) > ");

if (userInput.trim().length > 0) {
  initPupp("https://auto.naver.com/bike/mainList.nhn")
    .then(pageInfo => gotoPage(pageInfo))
    .then(pageInfo => pageControl(pageInfo));
}
