'use strict'
const packageDownload = require('./lib/DownloadPackages.js');
const scrapeNpm = require('./lib/ScrapeNpm.js');
const readGist = require('./lib/ReadGist.js');
const downloadGist = require('./lib/DownloadGistFile.js')

var path  = './lib/file.txt';

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
