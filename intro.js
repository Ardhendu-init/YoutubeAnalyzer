const puppeteer = require("puppeteer");
console.log("before");
let page;
const browserOpen = puppeteer.launch({
  headless: false,
  defaultViewport: null, //for full screen
});
browserOpen
  .then((browser) => {
    const pagesArr = browser.pages(); //give currently open tabs
    return pagesArr;
  })
  .then((broweserPages) => {
    page = broweserPages[0];
    const gotoGoole = page.goto("https://www.google.com/"); //goto func open an url given to its argument

    return gotoGoole;
  })
  .then(() => {
    //waiting for the element to appear in the page
    return page.waitForSelector("input[type='text']", { visible: true });
  })
  .then(() => {
    //type any element on that page -> selector
    return page.type("input[type='text']", "pepcoding");
  })
  .then(() => {
    //page.keyboard ->to type special character
    return page.keyboard.press("Enter");
  })
  .then(() => {
    return page.waitForSelector("h3.LC20lb.MBeuO.DKV0Md", { visible: true });
  })
  .then(() => {
    //for mouse click
    return page.click("h3.LC20lb.MBeuO.DKV0Md");
  })
  .catch((err) => {
    console.log(err);
  });
console.log("after");

// Article to know more about puppeteer
// 1.https://flaviocopes.com/puppeteer/
// 2.https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples/
