'use strict'
const downloadPackages = require('lib/DownloadPackage');
const scrapeNpm = require('');

module.exports = downloadPackages

function downloadPackages (count, callback) {
    data = scrapeNpm(count);
    downloadPackages.getPackages(data, './packages');
    callback();
}
