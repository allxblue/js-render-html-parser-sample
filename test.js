const fs = require("fs");

const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const url = "https://your-target-url";
const xpath = '/html/body/div[1]/div/div[2]/div/div/div[2]/div[1]/div/div[2]/div[2]/div[1]/div[1]/div/div[1]/div[2]/div[4]/span/i';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    // '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', 
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(url);
  // 等此區域已經載入
  // await page.waitForSelector("div[data-test-id='Event.Row']");
  await page.waitForSelector(".when-rended-element");

  // 取當前已 render 完畢的網站值
  const content = await page.content()

  // 若結構允許可用 jquery 方式取
  // let $ = await cheerio.load(body)

  let elHandle = await page.$x(xpath);

  let val = await page.evaluate(el => el.textContent, elHandle[0]);
  let fileName = "test.txt";
  fs.writeFile(fileName, content, function(err) {
      if (err)
          console.log(err);
      else
          console.log('寫入完成');
  })

  await browser.close();
})();