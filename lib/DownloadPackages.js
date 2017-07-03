'use strict'

var downloadNpmPackage = require('download-npm-package');
var Promise = require('bluebird');

module.exports.getPackages = getPackages;

function getPackages(arg, dir) {
    function getNpmPackage(name, version){
      console.log(`${name}@${version}`);
      downloadNpmPackage({
        arg: `${name}@${version}`,
        dir: dir});
    }
    return Promise.map(arg,
      function(packageData){
        getNpmPackage(packageData.name, packageData.version);
        return `${packageData.name}@${packageData.version}`;
      }).then(function(){
        console.log('download complete');
      });
}
