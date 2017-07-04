'use strict'
var https = require('https'),
    fs = require('fs'),
    readline = require('readline'),
    deferred = require('deferred'),
    promise = require('bluebird'),
    stream = require('stream'),
    arrayContainingResults = [],
    result = deferred(),
    textSource = 'https://gist.githubusercontent.com/anvaka/8e8fa57c7ee1350e3491/raw/77148a2cc39554483e789a4f3ccfc6d0120bb54e/01.most-dependent-upon.md';

module.exports.readGistText = readGistText;

function readGistText(path){
  downloadGistText(path).then(data => {
    console.log(data);
    var instream = fs.createReadStream(path);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);

    rl.on('line', function(line) {
      var p = new RegExp('(.*?).*?(\\[.*?\\])',["i"]);
      var m = p.exec(line);
      if(m != null){
          var sbraces=m[2];
          var s = sbraces.replace(/</,"&lt;");
          var dict = {};
          dict['name'] = s.slice(1, -1);
          dict['version'] = 'latest';
          arrayContainingResults.push(dict);
      }
    });
    rl.on('close', function() {
      result.resolve(arrayContainingResults);
      console.log('read file complete');
    });
  });
  return result.promise;
}

var downloadGistText = (function (path) {
  var res = deferred();
  var file = fs.createWriteStream(path);
  var request = https.get(textSource, function(response) {
    response.pipe(file);
    res.resolve(path);
  });
  return res.promise;
});
