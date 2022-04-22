const puppeteer = require("puppeteer");
const link =
  "https://www.youtube.com/playlist?list=PL-Jc9J83PIiEeD3I4VXETPDmzJ3Z1rWb4";

let ctab;
(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    const pages = await browser.pages();
    ctab = pages[0];
    await ctab.goto(link);
    await ctab.waitForSelector("h1#title");
    const name = await ctab.evaluate((select) => {
      return document.querySelector(select).innerText;
    }, "h1#title");
    const primaryData = await ctab.evaluate(
      getData,
      "#stats .style-scope.ytd-playlist-sidebar-primary-info-renderer"
    );

    console.log(name, primaryData.noOfVideos, primaryData.noOfViews);
    const videos = primaryData.noOfVideos.split(" ")[0];
    console.log(videos);
  } catch (error) {}
})();

const getData = (select) => {
  const allElms = document.querySelectorAll(select);
  const noOfVideos = allElms[0].innerText;
  const noOfViews = allElms[1].innerText;
  return {
    noOfVideos,
    noOfViews,
  };
};
