const { normalizeURL, getLinksHtml } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalize", () => {
  const input = "https://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

test("normalize strip url protocol", () => {
  const input = "https://blog.boot.dev/path/";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

// acutally the URl object make it lower case for us
test("normalize capitals", () => {
  const input = "https://BLOG.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});

// acutally the URl object make it http like https 
test("normalize capitals", () => {
  const input = "http://blog.boot.dev/path";
  const actual = normalizeURL(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
// =============== second test ================== //


test("absolute links for html dom", () => {
  const htmlText = `
  <html>
    <body>
      <a href="https://blog.boot.dev/">
        click to blog boot dev page
      </a>
    </body>
  </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getLinksHtml(htmlText, baseURL);
  const expected = ["https://blog.boot.dev/"];
  expect(actual).toEqual(expected);
});

test("relative links for html dom", () => {
  const htmlText = `
  <html>
    <body>
      <a href="/path/">
        click to blog boot dev page
      </a>
    </body>
  </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getLinksHtml(htmlText, baseURL);
  const expected = ["https://blog.boot.dev/path/"];
  expect(actual).toEqual(expected);
});

test("test both relative and absolute", () => {
  const htmlText = `
  <html>
    <body>
      <a href="https://blog.boot.dev/path/">
        click to blog boot dev page
      </a>
      <a href="https://blog.boot.dev/path1/">
        click to blog boot dev page
      </a>
    </body>
  </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getLinksHtml(htmlText, baseURL);
  const expected = ["https://blog.boot.dev/path/", "https://blog.boot.dev/path1/"];
  expect(actual).toEqual(expected);
});

test("invalid url", () => {
  const htmlText = `
  <html>
    <body>
      <a href="invalid">
        click to blog boot dev page
      </a>
    </body>
  </html>
  `;
  const baseURL = "https://blog.boot.dev";
  const actual = getLinksHtml(htmlText, baseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
