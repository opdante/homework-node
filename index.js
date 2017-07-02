'use strict'
const packageDownload = require('./lib/DownloadPackages.js');
const scrapeNpm = require('./lib/ScrapeNpm.js');
var pageURL = 'https://www.npmjs.com/browse/depended';

module.exports = downloadPackages

function downloadPackages (count, callback) {
  try {
    scrapeNpm.scrapeMostDependedOnPackages(pageURL).then(data => {
        console.log(data.length);
        var packages = data.slice(0, count);
        packageDownload.getPackages(packages, './packages/');
    });
  } catch (e) {
    console.error(e);
  } finally {
    callback();
  }

}
