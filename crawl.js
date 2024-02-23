const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pageObject) {
  const baseURLObject = new URL(baseURL);
  const currentURLObject = new URL(currentURL);

  if (baseURLObject.hostname !== currentURLObject.hostname) {
    return pageObject;
  }

  const normalizeCurrnetURL = normalizeURL(currentURL);
  if (pageObject[normalizeCurrnetURL] > 0) {
    pageObject[normalizeCurrnetURL]++;
    return pageObject;
  }
  console.log("actiavly crawling:", currentURL);

  pageObject[normalizeCurrnetURL] = 1;

  try {
    const resp = await fetch(currentURL);

    if (resp.status > 399) {
      console.log("error with status code:", resp.status);
      return pageObject;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log("not valid content type: ", contentType);
      return pageObject;
    }

    const htmlBody = await resp.text();

    const nextURLs = getLinksHtml(htmlBody, baseURL);
    for (const nextURL of nextURLs) {
      pageObject = await crawlPage(baseURL, nextURL, pageObject);
    }
  } catch (err) {
    console.log("## error happend: ", err);
  }

  return pageObject;
}

function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}
function getLinksHtml(htmlText, baseUrl) {
  let urls = [];
  const dom = new JSDOM(htmlText);
  const allUrls = dom.window.document.querySelectorAll("a");
  for (const urlElement of allUrls) {
    if (urlElement.href.slice(0, 1) === "/") {
      // relative
      try {
        const objectUrl = new URL(`${baseUrl}${urlElement.href}`);
        urls.push(objectUrl.href);
      } catch (err) {
        console.log("error happend invlid url");
      }
    } else {
      // absolute
      try {
        const objectUrl = new URL(urlElement.href);
        urls.push(objectUrl.href);
      } catch (err) {
        console.log("error happend invlid url");
      }
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getLinksHtml,
  crawlPage,
};
