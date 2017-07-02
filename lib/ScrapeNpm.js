'use strict'

var osmosis = require('osmosis'),
    deferred = require('deferred'),
    Promise = require('promise'),
    offset;

function scrapeMostDependedOnPackages(pageUrl){
  var result = deferred();
  var page;
  var arrayContainingResults = [];

    osmosis.get(pageUrl)
      .find('.pagination')
      .set({
         'offset': '@href'
       })
      .find('.package-details')
      .set({
            'name':    '.name',
            'version': '.type-neutral-1'
        })
      .data(function(data) {
        offset = data['offset'];
        arrayContainingResults.push(data);
      })
      .done(function() {
          //scrapeMostDependedOnPackages('https://www.npmjs.com' + offset)
          // All cases processed
          result.resolve(arrayContainingResults);
       })
      .error(console.log)
      .debug(console.log)
  return result.promise;
}

module.exports.scrapeMostDependedOnPackages = scrapeMostDependedOnPackages;
