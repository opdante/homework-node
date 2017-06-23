'use strict'
const DownloadNpmPackage = require('download-npm-package');
const Promise = require('bluebird');

module.exports = getPackages

function getPackages(arg, dir) {

    const getNpmPackage = (modulname, version) =>
      DownloadNpmPackage.downloadNpmPackage({
        arg: '${modulname}@${version}',
        dir: dir
    });

    return Promise.map(modulname,
      function(arg){
        getNpmPackage(arg.modulname, arg.version);
        return '${arg.modulname}@${arg.version}';
      });
}
