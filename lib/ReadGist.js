'use strict'
var https = require('https'),
    fs = require('fs'),
    readline = require('readline'),
    deferred = require('deferred'),
    promise = require('bluebird'),
    stream = require('stream'),
    gist = require('gist-get'),
    result = deferred();

module.exports.readGistText = readGistText;

function readGistText(path){
  downloadGistText(path).then(data => {
    console.log(data);
    var instream = fs.createReadStream(path);
    var outstream = new stream;
    var rl = readline.createInterface(instream, outstream);
    var   arrayContainingResults = [];

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
  var res = deferred(),
      gistID = '8e8fa57c7ee1350e3491',
      gistUrl = 'https://gist.githubusercontent.com/anvaka/',
      gistVersion;
  gist.latest(gistID, function(err, result){
     if (err) throw err;
     gistVersion = result.version;
     var gistSource = gistUrl + gistID + '/' + 'raw' +
                    '/' + gistVersion + '/' + '01.most-dependent-upon.md';
     console.log(gistSource);
     var file = fs.createWriteStream(path);
     var request = https.get(gistSource, function(response) {
       response.pipe(file);
       res.resolve(path);
     });
  });
  return res.promise;
});
