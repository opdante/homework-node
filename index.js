'use strict'
var packageDownload = require('./lib/DownloadPackages.js'),
    readGist = require('./lib/ReadGist.js'),
    downloadGist = require('./lib/DownloadGistFile.js'),
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
