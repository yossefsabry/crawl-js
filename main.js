const { crawlPage } = require("./crawl");
const { printReport } = require("./report");

async function main() {
  if (process.argv.length < 3) {
    console.log("no website provider");
    process.exit(1);
  }

  if (process.argv.length > 3) {
    console.log("cant crawl two website ");
    process.exit(1);
  }

  const baseURL = process.argv[2];
  console.log("starting crawl of ", baseURL);

  const pages = await crawlPage(baseURL, baseURL, {});

  // print the results
  printReport(pages);

}

main();
