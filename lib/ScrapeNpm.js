'use strict'

var osmosis = require('osmosis'),
    deferred = require('deferred'),
    Promise = require('promise'),
    arrayContainingResults = [],
    result = deferred(),
    page = 0,
    nextUrl;

function scrapeMostDependedOnPackages(pageUrl){
    nextUrl = 'https://www.npmjs.com/browse/depended?offset=' + page;
    osmosis.get(pageUrl)
      .find('.package-details')
      .set({
            'name':    '.name',
            'version': '.type-neutral-1'
        })
      .data(function(data) {
        arrayContainingResults.push(data);
      })
      .done(function() {
          // recursive attempt to scrape multiple packages,
          // by calling next page. (still work in progress).
          page += 36;
          if(page <= 180){
            scrapeMostDependedOnPackages(nextUrl);
          }
          result.resolve(arrayContainingResults);
       })
      .error(console.log)
      .debug(console.log)
  return result.promise;
}

module.exports.scrapeMostDependedOnPackages = scrapeMostDependedOnPackages;
