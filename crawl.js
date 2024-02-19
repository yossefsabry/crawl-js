const { JSDOM } = require("jsdom");

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
      urls.push(`${baseUrl}${urlElement.href}`);
    } else {
      // absolute
      urls.push(urlElement.href);
    }
  }
  return urls;
}

module.exports = {
  normalizeURL,
  getLinksHtml,
};
