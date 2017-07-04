'use strict'
const packageDownload = require('./lib/DownloadPackages.js');
const scrapeNpm = require('./lib/ScrapeNpm.js');
const readGist = require('./lib/ReadGist.js');
const downloadGist = require('./lib/DownloadGistFile.js')

var pageURL = 'https://www.npmjs.com/browse/depended',
    textSource = 'https://gist.githubusercontent.com/anvaka/8e8fa57c7ee1350e3491/raw/77148a2cc39554483e789a4f3ccfc6d0120bb54e/01.most-dependent-upon.md',
    path  = './lib/file.txt';

module.exports = downloadPackages

function downloadPackages (count, callback) {
  try {
    readGist.readGistText(path).then(data => {
      var packages = data.slice(0, count);
      packageDownload.getPackages(packages, './packages/');
    });
  } catch (e) {
    console.error(e);
  } finally {
    callback();
  }

}
